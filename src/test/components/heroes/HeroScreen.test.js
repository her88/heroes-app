import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';


describe('Pruebas en <HeroScreen />', () => {

    const history = {
        length: 3,
        push: jest.fn(),
        goBack: jest.fn()
    }

    
    test('debe de mostrar el componente redirect si no hay argumentos en el URL ', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={history} />
            </MemoryRouter>
        );

        expect(wrapper.find('Redirect').exists()).toBe(true);   
    });

    test('debe de mostrar un hero si el parametro existe y se encuentra ', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.row').exists() ).toBe(true);
        
    });

    test('debe de regresar a la pantalla anterior con PUSH ', () => {
       
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled(); // esto es lo mismo que abajo
        expect(history.goBack).toHaveBeenCalledTimes(0);

    
    });

    test('debe de regresar a la pantalla anterior GOBACK', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.goBack).toHaveBeenCalled();
        expect(history.goBack).toHaveBeenCalledTimes(1);
        expect(history.push).toHaveBeenCalledTimes(0);
        
    });

    test('debe de llamar el redirect si el hero no existe ', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spiderq2121212']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');
       
    });
    

})
