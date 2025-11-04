import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface ConfirmDeleteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export function ConfirmDelete({
  open,
  onOpenChange,
  onConfirm,
  title = 'Confirmar exclusão',
  description = 'Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.',
  confirmText = 'Excluir',
  cancelText = 'Cancelar',
  loading = false,
}: ConfirmDeleteProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <div className="relative z-50 w-full max-w-md mx-4">
            <div className="bg-white rounded-xs shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <Dialog.Title className="text-lg font-semibold text-gray-800">{title}</Dialog.Title>
                  <Dialog.Description className="text-sm text-gray-500 mt-1">{description}</Dialog.Description>
                </div>
                <Dialog.Close className="text-gray-400 hover:text-gray-600 p-1 rounded-xs">
                  <X size={18} />
                </Dialog.Close>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xs border bg-white text-gray-700 hover:bg-gray-50"
                  >
                    {cancelText}
                  </button>
                </Dialog.Close>

                <button
                  type="button"
                  onClick={async () => {
                    await onConfirm();
                  }}
                  disabled={loading}
                  className={`px-4 py-2 rounded-xs text-white ${loading ? 'bg-orange-300' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {loading ? 'Excluindo...' : confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
