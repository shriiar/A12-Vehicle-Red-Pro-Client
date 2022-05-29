import React from 'react';
import './Blogs.css';

const Blogs = () => {
    return (
        <div className='blog'>
            <div class="blogs mt-3">
                <div class="card-header">
                    <h1>How will you improve the performance of a React Application?</h1>
                </div>
                <div class="card-body">
                    <p class="card-text fs-5">
                        Keeping component state local as appropriate to improve performance in a React application. To avoid unwanted re-renders, emoize React components. Using dynamic import to separate code in React () In React, this is known as windowing or list virtualization. In React, lazy image loading is possible. The idea is to construct a functional component that will collect and redistribute all props to other components.
                    </p>
                </div>
            </div>
            <div class="blogs mt-3">
                <div class="card-header">
                    <h1>What are the different ways to manage a state in a React application?
                    </h1>
                </div>
                <div class="card-body">
                    <p class="card-text fs-5">
                        React applications are made up of components that handle their own state. This works fine for apps with a small number of components, but as the application becomes larger, handling shared states between components becomes more challenging. In your React projects, there are four sorts of state that you must effectively manage: Local state, global state, server state, and URL state are all different types of states.
                    </p>
                </div>
            </div>
            <div class="blogs mt-3">
                <div class="card-header">
                    <h1>How does prototypical inheritance work?</h1>
                </div>
                <div class="card-body">
                    <p class="card-text fs-5">
                        A hidden internal attribute called [[Prototype]] exists in every object, along with its methods and properties. The javascript feature prototypal inheritance allows you to add methods and attributes to objects. It's a property and method inheritance mechanism that allows one object to inherit properties and methods from another. To acquire and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf, respectively.
                    </p>
                </div>
            </div>
            <div class="blogs mt-3">
                <div class="card-header">
                    <h1>How does prototypical inheritance work?</h1>
                </div>
                <div class="card-body">
                    <p class="card-text fs-5">
                        It is never a good idea to modify the state directly because of the following: If you edit it directly, future calls to setState() may override your modifications. When you directly update the state, this.state does not change immediately. Instead, it creates a pending state transition that will only yield the current value when retrieved after this function has been called.
                    </p>
                </div>
            </div>
            <div class="blogs mt-3">
                <div class="card-header">
                    <h1>What is a unit test? Why should write unit tests?</h1>
                </div>
                <div class="card-body">
                    <p class="card-text fs-5">
                        Unit tests are automated tests created and run by software developers to ensure that a component of an application (referred to as a unit) follows its design and functions as expected. Unit testing ensures that code fulfills quality standards before it is released. This encourages a stable technical environment that places a high value on quality. During the product development life cycle, unit testing saves time and money.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Blogs;