import Button, { ButtonProps } from '@/kit/Button/Button';
import {
  ModalOverlay,
  ModalProps as ChakraModalProps,
  Modal as ChakraModal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

type ModalProps = {
  title?: string;
  actionButtons?: ButtonProps[];
} & Pick<ChakraModalProps, 'isOpen' | 'onClose' | 'children'>;

const Modal = ({
  isOpen,
  actionButtons,
  children,
  title,
  onClose,
}: ModalProps) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {title ? <ModalHeader>{title}</ModalHeader> : null}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {actionButtons?.length ? (
          <ModalFooter gap={3}>
            {actionButtons.map((b, i) => (
              <Button key={i} {...b} />
            ))}
          </ModalFooter>
        ) : null}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
