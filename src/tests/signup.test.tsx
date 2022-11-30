import renderer from 'react-test-renderer';

import SignUp from '../pages/signup';

it('renders signup correctly', () => {
    const tree = renderer
        .create(<SignUp />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});