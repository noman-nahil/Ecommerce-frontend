import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home/Home';

const Main = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </div>
    )
}

export default Main;