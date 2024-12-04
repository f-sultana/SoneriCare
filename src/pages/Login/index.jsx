import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import styled from "styled-components";
import Logo from "../../assets/images/logo.png";
import { useRouter } from "../../hooks/useRouter";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  background-color: white;
  width: 30vw;
  min-width: 400px;
  border-radius: 10px;
  padding: 30px;
`;

const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Image = styled.img`
  width: 20vw;
  height: 80px;
  object-fit: contain;
  margin-bottom: 20px;
`;

export function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = useCallback(() => {
    router.push("/");
  }, [router]);

  const renderForm = (
    <Form>
      <TextField
        fullWidth
        name="email"
        label="Email address"
        defaultValue="hello@gmail.com"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        defaultValue="@demo1234"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in
      </LoadingButton>
    </Form>
  );

  return (
    <Container>
      <FormWrapper>
        <FormHeader>
          <Image src={Logo} />
        </FormHeader>
        {renderForm}
      </FormWrapper>
    </Container>
  );
}
