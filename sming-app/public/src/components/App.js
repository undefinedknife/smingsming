import React from 'react';
import { Switch, Route }from 'react-router';
import Home from './Home';
import NavigationBar from './NavigationBar';

const App = () => (
    <div>
        <NavigationBar className=".navbar" />
        <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route path="/admin" component={Admin} /> */}
        </Switch>
    </div>
)
export default App;