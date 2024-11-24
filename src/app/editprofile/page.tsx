'use client';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../../styles/editProfile.css';
import swal from 'sweetalert';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { createProfile } from '@/lib/dbActions';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { EditProfileSchema } from '@/lib/validationSchemas';
import LoadingSpinner from '@/components/LoadingSpinner';

const onSubmit = async (
  data: { firstName: string; lastName: string; major: string; bio: string },
  session: any,
) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  const userId = parseInt(session?.user?.id, 10); // Assuming userId is available in session
  await createProfile({ ...data, userId, id: userId });

  swal('Success', 'created profile', 'success', {
    timer: 1000,
  });
};

const EditProfile: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddStuffForm', status, session);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(EditProfileSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <div className="p-5">
      <h1 className="createSessionTitle text-center">
        <strong>Edit Profile</strong>
      </h1>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={10}>
            <Card className="thebox">
              <Card.Body>
                <div className="profile-image-container">
                  <div className="profile-image">
                    <div className="add-icon-circle">
                      <span className="add-icon">+</span>
                    </div>
                  </div>
                </div>
                <Form
                  onSubmit={handleSubmit((data) => onSubmit(data, session))}
                >
                  <Row>
                    <Col>
                      <Form.Group controlId="formFirstName">
                        <Form.Label />
                        <input
                          type="text"
                          className="form-control"
                          {...register('firstName')}
                          placeholder="First Name"
                        />
                        <div className="invalid-feedback" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formLastName">
                        <Form.Label />
                        <input
                          type="text"
                          className="form-control"
                          {...register('lastName')}
                          placeholder="Last Name"
                        />
                        <div className="invalid-feedback" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formMajor">
                        <Form.Label />
                        <input
                          type="text"
                          className="form-control"
                          {...register('major')}
                          placeholder="Major"
                        />
                        <div className="invalid-feedback" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formBio">
                        <Form.Label />
                        <input
                          type="text"
                          className="form-control"
                          {...register('bio')}
                          placeholder="Bio"
                        />
                        <div className="invalid-feedback" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <input type="hidden" />
                  <Form.Group className="form-group">
                    <Row className="pt-3">
                      <Col />
                      <Col />
                      <Col />
                      <Col>
                        <Button
                          className="cSbutton"
                          type="submit"
                          variant="primary"
                        >
                          Save Profile
                        </Button>
                      </Col>
                      <Col />
                      <Col />
                      <Col />
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditProfile;
