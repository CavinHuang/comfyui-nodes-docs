# Documentation
- Class name: RegionalIPAdapterMask
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

RegionalIPAdapterMask节点旨在通过应用掩码和各种条件参数来适应和处理区域性图像数据。它便于对特定区域的图像效果进行修改，而无需改变整个数据集，增强了对图像转换和适应的控制。

# Input types
## Required
- mask
    - 掩码参数对于定义节点将关注图像的区域至关重要。它决定了哪些部分的图像会受到节点处理的影响，使得针对性的修改和增强成为可能。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- image
    - 图像参数是必需的，因为它提供了节点操作的基础输入。它是节点将要处理的原始数据，根据掩码和其他参数应用区域性适应和增强。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- weight
    - 权重参数影响节点处理的强度。它调整区域适应应用到图像的强度，允许根据期望的效果对输出进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - 噪声是一个重要的参数，它为节点处理引入了可变性。它为区域适应添加了一定程度的随机性，这有助于创建更自然或多样化的输出变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - 权重类型参数决定了如何将权重应用于图像。它可以是原始的、线性的或通道惩罚的，每种方法都会影响权重在图像中的分布和影响，从而改变最终结果。
    - Comfy dtype: COMBO
    - Python dtype: str
- start_at
    - start_at定义了节点处理的范围开始。它是一个浮点值，设置了权重应用的起始点，允许在区域适应中进行受控的过渡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at标记了节点处理范围的结束。与start_at类似，它是一个浮点值，规定了权重应用的终点，确保区域适应中有平滑而渐进的过渡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unfold_batch
    - 展开批次，启用时，会改变节点处理图像数据的方式。它可以提高节点操作的效率，特别是在处理大量图像批次时。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- faceid_v2
    - 当启用faceid_v2参数时，节点内激活额外的面部识别功能。这可以增强节点处理和适应图像中特定面部区域的能力。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- weight_v2
    - weight_v2是一个高级参数，允许进一步定制权重应用。它提供了一个额外的控制层，用于微调区域适应。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output
    - RegionalIPAdapterMask节点的输出是经过适应的图像，它根据输入参数进行了区域处理。这个输出准备好了供进一步使用或分析，区域适应和增强已经完全集成到最终结果中。
    - Comfy dtype: REGIONAL_IPADAPTER
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class RegionalIPAdapterMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'image': ('IMAGE',), 'weight': ('FLOAT', {'default': 0.7, 'min': -1, 'max': 3, 'step': 0.05}), 'noise': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'weight_type': (['original', 'linear', 'channel penalty'],), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'unfold_batch': ('BOOLEAN', {'default': False})}, 'optional': {'faceid_v2': ('BOOLEAN', {'default': False}), 'weight_v2': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05})}}
    RETURN_TYPES = ('REGIONAL_IPADAPTER',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Regional'

    def doit(self, mask, image, weight, noise, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False, faceid_v2=False, weight_v2=False):
        cond = IPAdapterConditioning(mask, weight, weight_type, noise=noise, image=image, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch, faceid_v2=faceid_v2, weight_v2=weight_v2)
        return (cond,)
```