import renderer from 'react-test-renderer';
import Home from '../pages/home';

it('renders home correctly', () => {
    const tree = renderer
        .create( Home() )
        .toJSON();
    expect(tree).toMatchSnapshot();
});