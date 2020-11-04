import React, { useState } from "react";
import PropTypes from "prop-types";
import configs from "../../utils/configs";
import { SignInModal, SignInStep, SubmitEmail, WaitForVerification, SignInComplete } from "./SignInModal";

// TODO: Migrate to use AuthContext
export function RoomSignInModalContainer({ onClose, step, onSubmitEmail, message, continueText, onContinue }) {
  const [cachedEmail, setCachedEmail] = useState();

  return (
    <SignInModal onClose={onClose} closeable>
      {step === SignInStep.submit && (
        <SubmitEmail
          onSubmitEmail={email => {
            setCachedEmail(email);
            onSubmitEmail(email);
          }}
          initialEmail={cachedEmail}
          termsUrl={configs.link("terms_of_use", "https://github.com/mozilla/hubs/blob/master/TERMS.md")}
          showTerms={configs.feature("show_terms")}
          privacyUrl={configs.link("privacy_notice", "https://github.com/mozilla/hubs/blob/master/PRIVACY.md")}
          showPrivacy={configs.feature("show_privacy")}
          message={message}
        />
      )}
      {step === SignInStep.waitForVerification && (
        <WaitForVerification
          onCancel={onClose}
          email={cachedEmail}
          showNewsletterSignup={configs.feature("show_newsletter_signup")}
        />
      )}
      {step === SignInStep.complete && (
        <SignInComplete message={message} continueText={continueText} onContinue={onContinue} />
      )}
    </SignInModal>
  );
}

RoomSignInModalContainer.propTypes = {
  onClose: PropTypes.func,
  onSubmitEmail: PropTypes.func,
  step: PropTypes.string,
  message: PropTypes.string,
  continueText: PropTypes.string,
  onContinue: PropTypes.func
};
