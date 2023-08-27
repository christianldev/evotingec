import React from 'react';
import {Outlet} from 'react-router-dom';

const Header = ({title, handleLogout}) => {
	return (
		<header
			className="ltr:ml-[248px] rtl:mr-[248px] sticky top-0 z-[999]"
			id="v-pills-tabContent">
			<div
				className=" app-header md:px-6 px-[15px]  dark:bg-slate-800 shadow-base  bg-white
        dark:border-b dark:border-slate-700 dark:border-opacity-60
             md:py-6 py-3
        ">
				<div className="flex justify-between items-center h-full">
					<div className="flex items-center md:space-x-4 space-x-2 rtl:space-x-reverse">
						<div className="flex items-center xl:text-sm text-lg xl:text-slate-500 text-slate-800 dark:text-slate-400 px-1 space-x-3 rtl:space-x-reverse">
							{title}
						</div>
					</div>
					<div className="nav-tools flex items-center lg:space-x-6 space-x-3 rtl:space-x-reverse">
						<button
							className="btn btn-sm btn-warning relative inline-block"
							onClick={() => handleLogout()}>
							<i className="fa-solid fa-right-from-bracket"></i>{' '}
							Cerrar sesion
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
