import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { PageContext } from '../PageContextProvider';
import { toast } from 'react-toastify';
import { MultiSelect } from "react-multi-select-component";

// const optionss = [
//     { label: "Grapes 🍇", value: "grapes" },
//     { label: "Mango 🥭", value: "mango" },
//     { label: "Strawberry 🍓", value: "strawberry"},
//     { label: "teste 🍓", value: "teste"},
//     { label: "teste2 🍓", value: "teste2"},
//   ];

function Home() {

    //PageContextProvider
    const { access_token } = useContext(PageContext);
    const { csrf_token } = useContext(PageContext);
    const { setAccess_token } = useContext(PageContext);
    const { setUser } = useContext(PageContext);

    //resources
    const [cities, setCities] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    const [multiSelectOptions, setMultiSelectOptions] = useState([]);
    const [formMode, setFormMode] = useState(0); //0=none, 1-create, 2-edit

    //group form
    const [groupIdEdit, setGroupIdEdit] = useState('');
    const [groupName, setGroupName] = useState('');
    const [selectedCities, setSelectedCities] = useState([]);
    
    const logout = () => {
        return new Promise((resolve, reject) => {
            showLoadingSpinner();

            let requestOptions = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${access_token}`
                },
            };
        
            fetch(`/api/logout`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result.logout) {
                        toast.success('Logout realizado!');
                        setUser(null);
                        setAccess_token(null);
                    } else {
                        toast.error('Erro ao realizar logout! ')
                        console.log(JSON.stringify(result));
                    }

                    hideLoadingSpinner();
                    resolve(result);
                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                    reject('Erro ao logar: ' , error)
                });
        });
    };

    const getCities = () => {
        return new Promise((resolve, reject) => {
            showLoadingSpinner();

            let requestOptions = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${access_token}`
                }
            };
        
            fetch(`/api/cities`, requestOptions)
                .then(response => response.json())
                .then(result => {

                    if(result.cities){
                        setCities(result.cities);
                    } else {
                        console.log('Erro ao buscar cidades: ', error)
                    }

                    hideLoadingSpinner();
                    resolve(result);
                })
                .catch(error => {
                    console.log('Erro ao buscar cidades: ', error)
                    reject('Erro ao buscar cidades: ' , error)
                });
        });
    }

    const getUserGroups = () => {
        return new Promise((resolve, reject) => {
            showLoadingSpinner();

            let requestOptions = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${access_token}`
                }
            };
        
            fetch(`/api/groups`, requestOptions)
                .then(response => response.json())
                .then(result => {

                    if(result.userGroups){
                        setUserGroups(result.userGroups);
                    } else {
                        toast.error('Erro ao buscar grupos do usuário')
                        console.log('Erro ao buscar grupos do usuário: ', JSON.stringify(result))
                    }

                    hideLoadingSpinner();
                    resolve(result);
                })
                .catch(error => {
                    console.log('Erro ao buscar grupos: ', error)
                    reject('Erro ao buscar grupos: ' , error)
                });
        });
    }

    //on mount
    useEffect(() => {
        getCities();
        getUserGroups();
    }, []);

    const buildMultiSelectOptions = () => {
        Object.keys(cities).forEach( (index) => {
            setMultiSelectOptions(multiSelectOptions => [
                ...multiSelectOptions,
                {
                label: /*props.options[index][props.optionsKey] + ' - ' +*/ cities[index].name + ' - ' + cities[index].state,
                value: cities[index].id
                }
            ]);
        })
    }
    
    // on cities update
    useEffect(() => {
        buildMultiSelectOptions();
    }, [cities]);

    
    const createGroup = () => {
        return new Promise((resolve, reject) => {
            showLoadingSpinner();

            let body = {
                groupName: groupName,
                selectedCities: pluck(selectedCities, 'value'),
            };

            body = JSON.stringify(body);

            let requestOptions = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${access_token}`
                },
                body:body
            };
        
            fetch(`/api/groups`, requestOptions)
                .then(response => response.json())
                .then(result => {

                    if(result.success) {
                        toast.success(result.success);
                        changeFormToNone();

                    } else {
                        toast.error(result.error)
                        console.log(JSON.stringify(result));
                    }

                    //if it's with multiple messages
                    if(Array.isArray(result.errors) || typeof result.errors === 'object'){
                        Object.entries(result.errors).forEach(([errorsKey, errors]) => {
                                errors.forEach((errorMessage, index)=> {
                                    toast.error(errorMessage)
                                })
                            }
                        );
                    }

                    getUserGroups();
                    hideLoadingSpinner();
                    resolve(result);
                })
                .catch(error => {
                    toast.error('Erro ao criar grupo')
                    console.log(JSON.stringify(error));
                    reject('Erro ao criar grupo: ' , error)
                });
        });
    };
    
    const editGroup = () => {
        return new Promise((resolve, reject) => {
            showLoadingSpinner();

            let body = {
                groupId: groupIdEdit,
                groupName: groupName,
                selectedCities: pluck(selectedCities, 'value'),
            };

            body = JSON.stringify(body);

            let requestOptions = {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${access_token}`
                },
                body:body
            };
        
            fetch(`/api/groups`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)

                    if(result.success) {
                        toast.success(result.success);
                        changeFormToNone();

                    } else {
                        toast.error(result.error)
                        console.log(JSON.stringify(result));
                    }

                    //if it's with multiple messages
                    if(Array.isArray(result.errors) || typeof result.errors === 'object'){
                        Object.entries(result.errors).forEach(([errorsKey, errors]) => {
                                errors.forEach((errorMessage, index)=> {
                                    toast.error(errorMessage)
                                })
                            }
                        );
                    }

                    getUserGroups();
                    hideLoadingSpinner();
                    resolve(result);
                })
                .catch(error => {
                    toast.error('Erro ao editar grupo')
                    console.log(JSON.stringify(error));
                    reject('Erro ao editar grupo: ' , error)
                });
        });
    };

    const deleteGroup = (groupId) => {
        return new Promise((resolve, reject) => {
            showLoadingSpinner();

            let body = {
                groupId: groupId,
            };

            body = JSON.stringify(body);

            let requestOptions = {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${access_token}`
                },
                body:body
            };
        
            fetch(`/api/groups`, requestOptions)
                .then(response => response.json())
                .then(result => {

                    if(result.success) {
                        toast.success(result.success);

                    } else {
                        toast.error(result.error)
                        console.log(JSON.stringify(result));
                    }

                    getUserGroups();
                    hideLoadingSpinner();
                    resolve(result);
                })
                .catch(error => {
                    toast.error('Erro ao excluir grupo')
                    console.log(JSON.stringify(error));
                    reject('Erro ao excluir grupo: ' , error)
                });
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    const handleGroupName = (e) => {
        setGroupName(e.target.value);
    }

    const handleGroupFormCreate = (e) => {
        e.preventDefault();
        createGroup();
    }

    const handleGroupFormEdit = (e) => {
        e.preventDefault();
        editGroup();
    }

    const handleGroupDelete = (e) => {
        e.preventDefault();
        deleteGroup(e.target.value);
    }

    const changeFormToCreate = (e) => {
        //clear form
        setGroupName('');
        setSelectedCities([]);

        setFormMode(1);
    }

    const changeFormToNone = (e=null) => {
        //clear form
        setGroupName('');
        setSelectedCities([]);

        setFormMode(0);
    }

    const changeFormToEdit = (e) => {
        let groupEdit = null;
        userGroups.forEach((item, index)=>{
            if(item.id == e.target.value) {
                groupEdit = item;
            }
        })
        
        //populate edit form
        setGroupIdEdit(groupEdit.id);
        setGroupName(groupEdit.name);
        let selectedCitiesArray = [];
        groupEdit.cities.forEach((item, index)=>{
            selectedCitiesArray.push({label: item.name + ' - ' + item.state, value: item.id});
        })
        setSelectedCities(selectedCitiesArray);

        setFormMode(2);
    }

   



    return (
        <div className="container">
            {access_token ? '' : <Navigate to="/" replace={true} />}
            

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header home-header">
                            <h4>Grupos de Cidades</h4>
                            <button type='button' className='btn btn-primary' onClick={logout}>Sair</button>
                        </div>
                        <div className="card-header home-header">
                            {formMode == 0 ? <button type='button' onClick={changeFormToCreate} className='btn btn-success' >Adicionar Grupo</button> : ''}

                            {formMode != 0 ?
                                <form className='group-form' onSubmit={handleFormSubmit}>
                                    {formMode == 2 ? <input id="groupIdEdit" type="text" readOnly className={`form-control`} value={groupIdEdit} name="groupIdEdit"/> : ''}
                                    <input id="name" type="text" onChange={handleGroupName} className={`form-control`} style={{backgroundColor: 'white'}} value={groupName} name="name" required placeholder='Nome do Grupo' />
                                    <MultiSelect
                                        options={multiSelectOptions}
                                        value={selectedCities}
                                        onChange={setSelectedCities}
                                        labelledBy="Select"
                                    />

                                    {formMode == 1 ? <button type='button' onClick={handleGroupFormCreate} className='btn btn-primary' >Criar Grupo</button> : ''}
                                    {formMode == 2 ? <button type='button' onClick={handleGroupFormEdit} className='btn btn-primary' >Editar Grupo</button> : ''}
                                </form>
                            : ''
                            }
                            
                            {formMode != 0 ? <button type='button' onClick={changeFormToNone} className='btn btn-danger' >Cancelar</button> : ''}
                        </div>

                        <div className="card-body">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Cidades</th>
                                    <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    userGroups.map((group) => {
                                        return (
                                            <tr key={group.id} className='group-data'>
                                                <th scope="row">{group.id}</th>
                                                <td>{group.name}</td>
                                                <td>
                                                    {
                                                    group.cities.map((city) => {
                                                        return (
                                                            <React.Fragment key={city.id}>{city.name} - {city.state}<br/></React.Fragment>
                                                        )})
                                                    }
                                                </td>
                                                <td className='actions'>
                                                    <button type='button' value={group.id} onClick={changeFormToEdit} className='btn btn-warning btn-sm show-on-hover' >Editar Grupo</button>
                                                    <button type='button' value={group.id} onClick={handleGroupDelete} className='btn btn-danger btn-sm' >Excluir Grupo</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>





            
        </div>
    );
}

function pluck(arr, key) {
    return arr.map(obj => obj[key]);
}

export default Home;