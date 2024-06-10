# Documentation
- Class name: CreateQRCodeNode
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

CreateQRCodeNode 类旨在从文本输入生成 QR 码。它封装了将字符串转换为 QR 码图像的功能，遵循指定的大小、版本、纠错级别、格子大小和边框参数。此节点在创建各种应用中所需的信息的视觉表示形式的 QR 码中扮演着关键角色。

# Input types
## Required
- text
    - ‘text’ 参数至关重要，因为它是要编码成 QR 码的信息源。它可以是一个多行字符串，允许包含更复杂的数据。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- size
    - ‘size’ 参数决定了 QR 码图像的尺寸。它很重要，因为它影响 QR 码的规模和可读性，默认值设置为确保大小和细节之间的平衡。
    - Comfy dtype: INT
    - Python dtype: int
- qr_version
    - ‘qr_version’ 参数控制 QR 码的版本，这对应于其纠错能力和数据存储容量。它对于确保 QR 码能够处理所提供的数据量至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- error_correction
    - ‘error_correction’ 参数设置 QR 码的错误纠正级别。它至关重要，因为它定义了 QR 码对损坏的韧性以及在不同距离下的可读性。
    - Comfy dtype: COMBO['L', 'M', 'Q', 'H']
    - Python dtype: str
- box_size
    - ‘box_size’ 参数指定 QR 网格中每个盒子的大小。它很重要，因为它影响 QR 码的视觉外观以及扫描 QR 码所需的精度。
    - Comfy dtype: INT
    - Python dtype: int
- border
    - ‘border’ 参数设置 QR 码周围边框的宽度。它很重要，因为它为 QR 码与其周围区域提供了清晰的界限，增强了其可扫描性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - ‘IMAGE’ 输出是由输入参数生成的 QR 码图像结果。它很重要，因为它是节点的主要交付物，以视觉格式表示编码的信息。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CreateQRCodeNode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'multiline': True}), 'size': ('INT', {'default': 512, 'min': 64, 'max': 4096, 'step': 64}), 'qr_version': ('INT', {'default': 1, 'min': 1, 'max': 40, 'step': 1}), 'error_correction': (['L', 'M', 'Q', 'H'], {'default': 'H'}), 'box_size': ('INT', {'default': 10, 'min': 1, 'max': 100, 'step': 1}), 'border': ('INT', {'default': 4, 'min': 0, 'max': 100, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'create_qr_code'
    CATEGORY = 'Masquerade Nodes'

    def create_qr_code(self, text, size, qr_version, error_correction, box_size, border):
        ensure_package('qrcode')
        import qrcode
        if error_correction == 'L':
            error_level = qrcode.constants.ERROR_CORRECT_L
        elif error_correction == 'M':
            error_level = qrcode.constants.ERROR_CORRECT_M
        elif error_correction == 'Q':
            error_level = qrcode.constants.ERROR_CORRECT_Q
        else:
            error_level = qrcode.constants.ERROR_CORRECT_H
        qr = qrcode.QRCode(version=qr_version, error_correction=error_level, box_size=box_size, border=border)
        qr.add_data(text)
        qr.make(fit=True)
        img = qr.make_image(fill_color='black', back_color='white')
        img = img.resize((size, size))
        tensor = torch.from_numpy(np.array(img))
        return (tensor2rgb(tensor.unsqueeze(0)),)
```