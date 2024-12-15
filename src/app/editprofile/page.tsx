'use client';

import s3 from '@/lib/s3';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from 'react-bootstrap';
import '../../styles/editProfile.css';
import swal from 'sweetalert';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { createProfile, getProfile } from '@/lib/dbActions';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { EditProfileSchema } from '@/lib/validationSchemas';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState, useEffect, ChangeEvent } from 'react';

const onSubmit = async (
  data: {
    firstName: string;
    lastName: string;
    major: string;
    bio: string;
    profilePictureUrl: string;
  },
  session: any,
) => {
  const userId = parseInt(session?.user?.id, 10);
  await createProfile({ ...data, userId, id: userId, points: 0 });

  swal('Success', 'Profile created successfully!', 'success', {
    timer: 1500,
  });
};

const EditProfile: React.FC = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      major: '',
      bio: '',
      profilePictureUrl: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Use type assertion to handle the any type
        const userId = session?.user && 'id' in session.user
          ? parseInt((session.user as any).id, 10)
          : null;

        if (userId) {
          const profileData = await getProfile(userId);

          if (profileData) {
            // Populate form fields
            if (profileData.profilePictureUrl) {
              setValue('profilePictureUrl', profileData.profilePictureUrl);
              setProfilePictureUrl(profileData.profilePictureUrl);
            }

            setValue('firstName', profileData.firstName || '');
            setValue('lastName', profileData.lastName || '');
            setValue('major', profileData.major || '');
            setValue('bio', profileData.bio || '');
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        swal('Error', 'Failed to load profile', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [session, setValue, status]);

  if (status === 'loading' || isLoading) {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
        Key: `public/${file.name}`,
        Body: file,
        ContentType: file.type,
      };

      s3.upload(
        uploadParams,
        (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
          if (err) {
            console.error('Error uploading image:', err);
          } else {
            console.log('Image uploaded successfully:', data.Location);
            setValue('profilePictureUrl', data.Location);
            setProfilePictureUrl(data.Location);
          }
        },
      );
    }
  }

  return (
    <div className="edit-profile-container">
      <h1 className="title">Edit Profile</h1>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="profile-card">
              <Card.Body>
                <div className="profile-image-section">
                  <div className="profile-image">
                    {profilePictureUrl ? (
                      <Image
                        src={profilePictureUrl}
                        alt="Profile"
                        className="uploaded-image"
                      />
                    ) : (
                      <div />
                    )}
                    <Button
                      className="add-icon-circle"
                      onClick={() => document.getElementById('profileImageInput')?.click()}
                    >
                      <span className="add-icon">+</span>
                    </Button>
                    <input
                      id="profileImageInput"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                <Form
                  onSubmit={handleSubmit((data) => onSubmit(data, session))}
                >
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formFirstName" className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your first name"
                          {...register('firstName')}
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formLastName" className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your last name"
                          {...register('lastName')}
                          isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="formMajor" className="mb-3">
                    <Form.Label>Major</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your major"
                      {...register('major')}
                      isInvalid={!!errors.major}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.major?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formBio" className="mb-4">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Tell us about yourself"
                      {...register('bio')}
                      isInvalid={!!errors.bio}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bio?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button type="submit" className="save-button">
                      Save Profile
                    </Button>
                  </div>
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
