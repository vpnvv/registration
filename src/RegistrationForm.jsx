import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  Button,
  Toast,
  ToastContainer,
  InputGroup,
} from 'react-bootstrap'
import {
  PersonFill,
  EnvelopeFill,
  TelephoneFill,
  LockFill,
  ShieldLockFill,
  Eye,
  EyeSlash,
} from 'react-bootstrap-icons'

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({ mode: 'onChange' })

  const [showSuccess, setShowSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmit = (data) => {
    console.log('Form Submitted:', data)
    setShowSuccess(true)
    reset()
  }

  const password = watch('password', '')

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4 text-primary fs-3">Register Account</h2>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border rounded shadow-sm bg-light"
        noValidate
      >
        
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <PersonFill />
            </InputGroup.Text>
                <Form.Control
                type="text"
                placeholder="Enter full name"
                {...register('fullName', {
                    required: 'Full Name is required',
                    minLength: { value: 3, message: 'Minimum 3 characters' },
                })}
                isInvalid={!!errors.fullName}
                className={watch('fullName') && !errors.fullName ? 'is-valid' : ''}
                />

            <Form.Control.Feedback type="invalid">
              {errors.fullName?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <EnvelopeFill />
            </InputGroup.Text>
                <Form.Control
                type="email"
                placeholder="Enter email"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Invalid email format',
                    },
                })}
                isInvalid={!!errors.email}
                className={watch('email') && !errors.email ? 'is-valid' : ''}
                />

            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        
        <Form.Group className="mb-3">
          <Form.Label>Mobile Number</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <TelephoneFill />
            </InputGroup.Text>
                <Form.Control
                type="text"
                maxLength={10}
                placeholder="Enter 10-digit number"
                {...register('mobile', {
                    required: 'Mobile number is required',
                    pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Enter a valid 10-digit number',
                    },
                })}
                isInvalid={!!errors.mobile}
                className={watch('mobile') && !errors.mobile ? 'is-valid' : ''}
                />

            <Form.Control.Feedback type="invalid">
              {errors.mobile?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <LockFill />
            </InputGroup.Text>
                <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Create password"
                {...register('password', {
                    required: 'Password is required',
                    pattern: {
                    value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                    message:
                        'Min 8 chars, with upper/lowercase, number, and special char',
                    },
                })}
                isInvalid={!!errors.password}
                className={watch('password') && !errors.password ? 'is-valid' : ''}
                />

            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <ShieldLockFill />
            </InputGroup.Text>
                <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                isInvalid={!!errors.confirmPassword}
                className={
                    watch('confirmPassword') &&
                    !errors.confirmPassword &&
                    watch('confirmPassword') === password
                    ? 'is-valid'
                    : ''
                }
                />

            <Button
              variant="outline-secondary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeSlash /> : <Eye />}
            </Button>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="I agree to the Terms and Conditions"
            {...register('terms', {
              required: 'You must accept the terms',
            })}
            isInvalid={!!errors.terms}
          />
          <Form.Control.Feedback type="invalid">
            {errors.terms?.message}
          </Form.Control.Feedback>
        </Form.Group>

        
        <Button
          type="submit"
          variant="primary"
          className="w-100"
          disabled={!isValid}
        >
          Register
        </Button>
      </Form>

      
      <ToastContainer position="middle-start" className="p-3">
        <Toast
          show={showSuccess}
          onClose={() => setShowSuccess(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header closeButton={true}>
            <strong className="me-auto text-success">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            egistration successfully submitted
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default RegistrationForm
