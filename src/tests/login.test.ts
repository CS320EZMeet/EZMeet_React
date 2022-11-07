import renderer from 'react-test-renderer';
import Login from '../pages/login';

it('renders login correctly', () => {
    const tree = renderer
        .create( Login() )
        .toJSON();
    expect(tree).toMatchSnapshot();
});