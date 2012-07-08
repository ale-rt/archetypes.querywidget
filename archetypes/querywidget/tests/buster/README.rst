Using Buster.JS for testing JavaScript in Plone 
===============================================

.. contents::

Introduction
------------
`Buster.JS <http://busterjs.org>`_ is a JavaScript testing toolkit that 
supports unit testing of both client side and server side JavaScript code. 
Buster is currently in a beta release and according to the 
`roadmap <http://busterjs.org/roadmap.html>`_ the first stable release is
expected soon.

In this README, we will show how it can be used for testing web client code. 
Buster runs the tests in a cloud formed by real browsers, that connect to 
Buster's test server.

After the server has been started, it provides information about the current 
members of the cloud, as well as allows an arbitrary browser to join the 
testing cloud, in a similar way as it is also implemented by other systems, 
(like for example, JsTestDriver). 
Any browser that is able to execute JavaScript, can participate in the cloud.
We can also add headless browsers to the cloud, such as, 
`PhantomJS <http://phantomjs.org>`_  which is a headless WebKit browser.

Clicking the “Capture browser” button will inform the user that the browser has 
joined the test cloud as an executor node, and that it will participate to test 
execution as long as the browser window is kept open.

Once the test cloud contains at least one browser, the configured test suites 
can be executed from the console. 
All the different types of browsers that have joined, will be used to deploy 
the tests.

The test-case API offers a wide range of functionality. 
In addition, the `Sinon.JS <http://sinonjs.org>`_ library (that comes installed
with Buster, but that is framework neutral, thus can also be used with any 
other testing system) offers a rich set of features that enables mocking from 
the unit tests in a powerful way.

Continuous integration of our buster tests is very easy as well. 
There is no need for a full server buildout, as the tests only requires access 
to the code on the filesystem. 
It work seamless with the `Plone Jenkins <http://jenkins.plone.org>`_.

Dependencies
------------
To run Buster you need to have:

- `node.js <http://nodejs.org/>`_
- `npm <http://npmjs.org/>`_

Installation
------------
Being in beta status, as explained by 
`the documentation <http://busterjs.org/docs/developers/>`_,  
we want to set up the development version of Buster.JS ::

  # configure the environment
  export BUSTER_HOME=$HOME/busterjs
  export NODE_PATH=$BUSTER_HOME
  export PATH=$NODE_PATH/buster-dev-tools/bin:$PATH
  export PATH=$NODE_PATH/buster/bin:$PATH
  # check out it
  mkdir $BUSTER_HOME
  cd $BUSTER_HOME 
  git clone https://github.com/busterjs/buster-dev-tools.git
  # pull up everything (may take some time)
  buster-dev-tools pull

Now you have a working Buster.JS installed. To run Buster you may want to make 
the modifications to the PATH and NODE_PATH environment variables persistent 
adding them to your shell startup files (e.g.: $HOME/.bashrc).

Running the tests
-----------------
First of all you need a Buster server up and running. If Buster is in your 
$PATH just type::

  buster server

It will tell you a server is listening on http://localhost:1111. 
If you access that URL the list of browser that declare themselves to be 
available for running tests will be displayed.
If tou want to add your browser to the list just click the "Capture browser" 
button.
It will bring you to http://localhost:1111/capture page. As long as the page 
is open your browser will be listed in the Buster server Homepage.

When your Buster.js test suite i ready just go in the directory of this README 
file and launche the command::

  buster test

Gotchas
-------
Of course Buster and Buster commands can be run with many parameters, try for 
example::

  buster --help
  buster server --help
  buster test --help

Have fun!