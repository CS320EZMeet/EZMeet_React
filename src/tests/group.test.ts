import renderer from 'react-test-renderer';
import Group from '../pages/group';

it('renders group correctly', () => {
    const tree = renderer
        .create( Group() )
        .toJSON();
    expect(tree).toMatchSnapshot();
});