import React from 'react';

const MyComponent = ({prop}) => {
	console.log(prop);
	return (
		<div>
			<div className="!z-5 relative flex  bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px]">
				<div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
					<span className="flex rounded-full bg-lightPrimary p-2 dark:bg-navy-700 items-center text-brand-500 dark:text-white">
						{prop.icon}
					</span>
					<p className="font-dm text-sm font-medium text-gray-600 p-2">
						{prop.title}
					</p>
				</div>
				<hr />
				<div className="text-xl font-bold text-navy-700 dark:text-white">
					{prop.count}
				</div>
			</div>
		</div>
	);
};

export default MyComponent;
