import renderer from 'react-test-renderer';
import App from '../App';

it('renders app correctly', () => {
    const tree = renderer
        .create( App() )
        .toJSON();
    expect(tree).toMatchSnapshot();
});