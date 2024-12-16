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
import { login } from "../../services";
import { toast } from "react-toastify";

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

  // State for email, password, and loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error] = useState(""); // Error state to display any login errors

  const handleSignIn = useCallback(async () => {
    // Simple client-side validation
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    // if (!/\S+@\S+\.\S+/.test(email)) {
    //   toast.error("Please enter a valid email address.");
    //   return;
    // }

    setLoading(true);

    try {
      // Make the API call
      const response = await login({ username: email, password });
      console.log(response); // Handle successful response, e.g., storing token
      localStorage.setItem("token", response.data.data.accessToken);
      // Redirect to homepage or dashboard after successful login
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }, [email, password, router]);

  return (
    <Container>
      <FormWrapper>
        <FormHeader>
          <Image src={Logo} />
        </FormHeader>
        <Form>
          <TextField
            fullWidth
            name="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
            error={!!error}
            helperText={error && error.includes("email") && error}
          />

          <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
            Forgot password?
          </Link>

          <TextField
            fullWidth
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            error={!!error}
            helperText={error && error.includes("password") && error}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="button"
            variant="contained"
            onClick={handleSignIn}
            loading={loading}
          >
            Sign in
          </LoadingButton>
        </Form>
      </FormWrapper>
    </Container>
  );
}
