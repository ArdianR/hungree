import React, { useState, useEffect } from 'react';
import { auth, firestore } from "../../services/firebase";
import firebase from "firebase/app";
import { Redirect } from "react-router-dom";

function Category() {
    const [category, setCategory] = useState([]);
    const [dropdown, setDropdown] = useState(false);
    const [modal, setModal] = useState(false);
    const [create, setCreate] = useState(false);
    const [update, setUpdate] = useState(false);
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        if (navigator.onLine) {
            console.log('online');
            firestore.collection("category").orderBy("datetime", "desc").get().then(snapshot => {
                setCategory(snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        name: doc.data().name,
                        datetime: doc.data().datetime
                    }
                }));
            });        
        }

        if (localStorage.key('category') !== null && navigator.onLine) {
            console.log('update storage');
            localStorage.setItem('category', JSON.stringify(category));
        }

        if (localStorage.key('category') === null && navigator.onLine) {
            console.log('crate storage');
            localStorage.setItem('category', JSON.stringify(category));
        }

        if (!navigator.onLine && localStorage.key('category') !== null) {
            console.log('offline');
            const local = localStorage.getItem('category');
            const parse = JSON.parse(local);
            setCategory(parse);
        }
    }, []);

    const onSubmit = async () => {
        await firestore.collection('category').add({
            name: name,
            datetime: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            setName("");
            setModal(false);
            setCreate(false);
        }).catch((error) => {
            console.error(error);
        });
    }

    const onUpdate = async () => {
        console.log(id, name);
        await firestore.collection('category').doc(id).update({
            name: name
        }).then(() => {
            setId("");
            setName("");
            setModal(false);
            setUpdate(false);
        }).catch((error) => {
            console.error(error);
        });
    }

    const onCreate = () => {
        setModal(!modal);
        setCreate(!create);
    }

    const onShow = (value) => {
        setModal(!modal);
        setShow(!show);
        setName(value.name);
    }


    const onEdit = (value) => {
        setModal(!modal);
        setUpdate(!update);
        setName(value.name);
        setId(value.id);
    }

    const onDelete = async (id) => {
        await firestore.collection('category').doc(id).delete()
        .then(res => {
            console.log(res);
        });
    }

    const onClose = () => {
        if (modal && create) {
            setModal(!modal);
            setCreate(!create);
        }
        if (modal && show) {
            setModal(!modal);
            setShow(!show);
            setName("");
        }
        if (modal && update) {
            setModal(!modal);
            setUpdate(!update);
            setId("");
            setName("");
        }
    }

    const onLogout = () => {
        auth().signOut()
        .then(() => {
            return <Redirect to="/login" />
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div>
            <nav class="bg-gray-800">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                            </div>
                            <div class="hidden md:block">
                                <div class="ml-10 flex items-baseline space-x-4">
                                    <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                                    <a href="/category" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Category</a>
                                    <a href="/product" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Product</a>
                                </div>
                            </div>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-4 flex items-center md:ml-6">
                                <button class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span class="sr-only">View notifications</span>
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </button>

                                <div class="ml-3 relative">
                                    <div>
                                        <button onClick={() => setDropdown(!dropdown)} class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                                            <span class="sr-only">Open user menu</span>
                                            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        </button>
                                    </div>
                                    {
                                        dropdown &&
                                        (
                                            <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">        
                                                <a href="/" c class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem" onClick={onLogout}>Sign out</a>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <header class="bg-white shadow">
                <div class="max-w-12xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold leading-tight text-gray-900">
                        Category
			        </h1>
                </div>
            </header>
            <main>
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div class="px-4 py-6 sm:px-0">
                        <div class="lg:flex lg:items-center lg:justify-between py-2">
                            <div class="flex-1 min-w-0">
                            </div>
                            <div class="mt-5 flex lg:mt-0 lg:ml-4">
                                <span class="sm:ml-3">
                                    <button onClick={onCreate} type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                        Create
                                    </button>
                                </span>
                            </div>
                        </div>
                        {
                            modal &&
                            (
                                <div class="fixed z-10 inset-0 overflow-y-auto">
                                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                                            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                                        </div>
                                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                                            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div class="sm:flex sm:items-start">
                                                    {(create || update) && (<input id="name" name="name" type="text" required class="appearance-none rounded-5 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />)}
                                                    {show && (<input id="name" disabled name="name" type="text" required class="appearance-none rounded-5 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" value={name} />)}
                                                    {update && (<input id="id" disabled name="id" type="hidden" required value={id} />)}
                                                </div>
                                            </div>
                                            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                {create && (<button onClick={onSubmit} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-white-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>)}
                                                {update && (<button onClick={onUpdate} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-white-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500 sm:ml-3 sm:w-auto sm:text-sm">Update</button>)}
                                                <button onClick={onClose} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div class="border-4 border-gray-200 rounded-lg">
                            <div class="flex flex-col">
                                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table class="min-w-full divide-y divide-gray-200">
                                                <thead class="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            No
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Name
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Datetime
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                    {
                                                        category.map((value, index) => (
                                                            <tr>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{index + 1}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{value.name}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div class="text-sm text-gray-900">{value.datetime !== null && (navigator.onLine ? value.datetime.toDate().toString() : Date(value.datetime))}</div>
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    <div>
                                                                        <a onClick={() => {onShow(value)}} class="text-blue-600 hover:text-blue-900 cursor-pointer text-xs">Show</a>
                                                                    </div>
                                                                    <div>
                                                                        <a onClick={() => {onEdit(value)}} class="text-yellow-600 hover:text-yellow-900 cursor-pointer text-xs">Edit</a>
                                                                    </div>
                                                                    <div>
                                                                        <a onClick={() => {onDelete(value.id)}} class="text-red-600 hover:text-red-900 cursor-pointer text-xs">Delete</a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Category;