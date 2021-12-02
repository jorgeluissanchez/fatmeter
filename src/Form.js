import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Input, Message, Button, Form, Icon, Header, Container} from 'semantic-ui-react';
import * as Yup from 'yup';
import Axios from 'axios';
import './css/Form.css';

const validacion = Yup.object().shape({
    nombre: Yup.string()
      . required('digite su nombre'),
    edad: Yup.number()
        .typeError('digite un numero')
        .required('digite su edad'),
    altura: Yup.number()
        .typeError('digite un numero')
        .required('digite su altura'),
    sexo: Yup.string()
        .matches(/(Femenino|Masculino)/, 'elija entre Masculino y Femenino')
        .required('digite su sexo'),
    peso: Yup.number()
        .typeError('digite un numero')
        .required('digite su peso'),
});

const form = () => {

    return(
        <Container ClassName="contenedor" centered>
            
            <Formik
                initialValues={{
                nombre: '',
                edad: '',
                peso: '',
                altura: '',
                sexo: '',
                }}

                validationSchema={validacion}
                
                onSubmit={async(valores) => {
                    const data = {
                        name: valores.nombre,
                        age: valores.edad,
                        weight: valores.peso,
                        height: valores.altura,
                        gender: valores.sexo,
                    }

                    await Axios.post('https://fatcrud.herokuapp.com/users', data)
                      .then(function (response) {
                        console.log(response);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                    console.log(data);
                }}
            >
            {({ errors, handleChange, handleSubmit }) => (
                <Form className="formulario" onSubmit={handleSubmit}>
                    
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Header  textAlign='center'>
                                <h1 className='titulo'>
                                FATMETER
                                </h1>
                                <Header.Subheader>
                                    Tu Medidor De Graga Corporal
                                </Header.Subheader>
                            </Header>
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Input 
				                type="text"
                                fluid
                                placeholder="Ingrese su nombre" 
            				    name="nombre"
	    			            onChange={handleChange}
		        		        error={errors.nombre}
        			        />
                            <ErrorMessage name="nombre" component={() => (
                                <Message color="red">{errors.nombre}</Message>
                            )} />
                        </Form.Field>
                        <Form.Field widths='equal'>
                            <Input 
		                	    type="text" 
                                fluid
		        		        placeholder="Ingrese se edad" 
                				name="edad"
		        		        onChange={handleChange}
                                error={errors.edad}
		        	        />
                            <ErrorMessage name="edad" component={() => (
                                <Message color="red">{errors.edad}</Message>
                            )} />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Input
                                label={{ basic: true, content: 'kg' }}
                                labelPosition='right'
                                placeholder='ingrese su peso'
                                name="peso"
                                fluid
                                onChange={handleChange}
                                error={errors.peso}
                            />
                            <ErrorMessage name="peso" component={() => (
                                <Message color="red">{errors.peso}</Message>
                            )} />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                label={{ basic: true, content: 'cm' }}
                                labelPosition='right'
                                fluid
                                placeholder='ingrese su altura'
                                name="altura"
                                onChange={handleChange}
                                error={errors.altura}
                            />
                            <ErrorMessage name="altura" component={() => (
                                <Message color="red">{errors.altura}</Message>
                            )} />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Input 
                                list='sexo'
                                fluid 
                                placeholder='Elija su sexo'
                                name="sexo"
                                onChange={handleChange}
                                error={errors.sexo}
                            />
                            <datalist id='sexo'>
                                <option value='Masculino'>Masculino</option>
                                <option value='Femenino'>Femenino</option>
                            </datalist>
                            <ErrorMessage name="sexo" component={() => (
                                <Message color="red">{errors.sexo}</Message>
                            )} />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Button 
                                type="submit" 
                                animated 
                                basic
                                fluid
                                color='black'
                            >
                                <Button.Content visible>Enviar</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='send' />
                                </Button.Content>
                            </Button>
                        </Form.Field>
                    </Form.Group>

                </Form>
                )}
            </Formik>
        </Container>
    );
}
export default form;