import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDown(props) {
  const options = props.options;

  const dropdownButtons = options.map(option => (
    <Menu.Item key={option}>
      {({ active }) => (
        <button
          className={classNames(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block w-full text-left px-4 py-2 text-sm'
          )}
          onClick={() => { 
            props.onClick(option);
          }}
        >
        {option}
        </button>
      )}
    </Menu.Item>
  ));

  return (
    <Menu as="div" className="text-left mx-1">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {props.selected}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10000">
          <div className="py-1">
            {dropdownButtons}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
};
