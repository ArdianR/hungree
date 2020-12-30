import React, { useState, useEffect } from "react";
import { auth, firestore } from "../services/firebase";
import {
	Route,
	BrowserRouter as Router,
	Switch
} from "react-router-dom";
import Category from "./category/index";
import Product from "./product/index";
import { Redirect } from "react-router-dom";

function Dashboard() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Index}></Route>
				<Route path="/category" component={Category}></Route>
				<Route path="/product" component={Product}></Route>
			</Switch>
		</Router>
	);
}

function Index() {
	const [dropdown, setDropdown] = useState(false);
	const [category, setCategory] = useState(0);
	const [product, setProduct] = useState();

    const onLogout = () => {
        auth().signOut()
        .then(() => {
            return <Redirect to="/" />
        })
        .catch(error => {
            console.error(error);
        });
	}
	
	useEffect(() => {
        if (navigator.onLine) {
            console.log('online');
            firestore.collection("category").get().then(snapshot => {
				setCategory(snapshot.size)
			});
            firestore.collection("product").get().then(snapshot => {
				setProduct(snapshot.size)
            });
		}
	}, []);

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
									<a href="/" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
									<a href="/category" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Category</a>
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
										<button onClick={() => {setDropdown(!dropdown)}} class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
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
						Dashboard
			  </h1>
				</div>
			</header>
			<main>
				<div class="max-w-12xl mx-auto py-6 sm:px-6 lg:px-8">
					<div class="px-4 py-6 sm:px-0">
						<div class="border-4 border-gray-200 rounded-lg">
							<div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
								<div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
									<a href="/category" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
										<svg class="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
										</svg>
										<div class="ml-4">
											<p class="text-base font-medium text-gray-900">Category</p>
											<p class="mt-1 text-sm text-gray-500">{category}</p>
										</div>
									</a>
									<a href="/product" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
										<svg class="flex-shrink-0 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
										</svg>
										<div class="ml-4">
											<p class="text-base font-medium text-gray-900">Product</p>
											<p class="mt-1 text-sm text-gray-500">{product}</p>
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;