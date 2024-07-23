import { Html , Head , Font , Preview , Heading , Row ,  Section , Text } from  "@react-email/components";
import { Verification } from "next/dist/lib/metadata/types/metadata-types";

interface VerficationEmailProps{
  username :string;
  otp:string;
}
  
  export default function VerificationEmail({username , otp}:
    VerficationEmailProps){
      return (
        <Html lang="en" dir="ltr">
          <Head>
            <title>Verification Code</title>
          </Head>
          <Preview>Here&apos;s your verfication code : {otp}</Preview>
          <section>
            <Row>
              <Heading as="h2">Hello {username},</Heading>
            </Row>
            <Row>
            <Text>Thank You for registering , Please use the f:ollowing verifcation 
              code to complete your registration
            </Text>
            </Row>
            <Row>
              <Text>{otp}</Text>
            </Row>
            <Row>
              <Text>If you did not request this code , please ignore this email.</Text>
            </Row>
          </section>
        </Html>
      )

    }