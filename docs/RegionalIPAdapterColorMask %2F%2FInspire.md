# Documentation
- Class name: RegionalIPAdapterColorMask
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

RegionalIPAdapterColorMask节点旨在对图像应用颜色遮罩，可用于将生成过程集中在感兴趣的特定区域上。该节点利用IPAdapter模型的力量，根据提供的遮罩对生成进行条件化，增强对视觉输出的控制，并确保更紧密地遵循指定的颜色区域。

# Input types
## Required
- color_mask
    - color_mask参数至关重要，它定义了将用于生成遮罩的图像。该图像被处理以创建一个二进制遮罩，该遮罩将应用于生成，确保在输出中强调指定的颜色区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask_color
    - mask_color参数对于确定用于创建遮罩的特定颜色至关重要。它是一个表示RGB格式颜色值的字符串，用于识别和隔离图像内的目标颜色区域。
    - Comfy dtype: STRING
    - Python dtype: str
- image
    - image参数是节点处理的输入图像。它是应用颜色遮罩的画布，其内容将受到遮罩的影响，以实现期望的视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- weight
    - weight参数调整遮罩对生成的影响。较高的权重意味着遮罩的影响更加显著，而较低的权重减少了其效果，允许将遮罩的颜色区域更微妙地融入最终输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - noise参数在生成过程中引入了一定程度的随机性。通过调整此参数，用户可以控制结果图像中的变化和不可预测性水平，为输出增添创造性和多样性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - weight_type参数允许用户选择应用权重到遮罩的方法。不同的权重类型可以改变遮罩对生成的影响方式，提供一系列创意控制选项，以实现期望的审美。
    - Comfy dtype: COMBO
    - Python dtype: str
- start_at
    - start_at参数定义了遮罩对生成影响的起始点。它有助于控制遮罩效果的逐步引入，允许在最终输出中更细致和可控地应用颜色遮罩。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数设置了遮罩对生成影响达到顶峰的点。它与start_at参数共同作用，在整个生成过程中创建遮罩效果的平滑过渡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unfold_batch
    - unfold_batch参数决定了在应用遮罩过程中是否应展开批次维度。这对于某些类型的生成非常有用，其中批次内的个别元素需要独特的遮罩应用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- faceid_v2
    - faceid_v2参数启用了先进的面部检测和识别系统，它可以细化遮罩应用，更准确地聚焦于图像中的面部特征。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- weight_v2
    - weight_v2参数是faceid_v2特性的额外权重控制，允许微调面部遮罩应用，以实现更精确和详细的面部特征表现。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- REGIONAL_IPADAPTER
    - regional_ipadapter输出是根据您的输入遮罩和颜色进行了调整的条件化模型。它准备好在后续的生成过程中使用，遮罩的影响已经融入其中，以引导创建期望的视觉元素。
    - Comfy dtype: REGIONAL_IPADAPTER
    - Python dtype: object
- MASK
    - MASK输出是从输入的color_mask和mask_color创建的二进制遮罩。这个遮罩可以用于进一步的处理，或者作为颜色遮罩所针对的图像区域的参考。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class RegionalIPAdapterColorMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'color_mask': ('IMAGE',), 'mask_color': ('STRING', {'multiline': False, 'default': '#FFFFFF'}), 'image': ('IMAGE',), 'weight': ('FLOAT', {'default': 0.7, 'min': -1, 'max': 3, 'step': 0.05}), 'noise': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'weight_type': (['original', 'linear', 'channel penalty'],), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'unfold_batch': ('BOOLEAN', {'default': False})}, 'optional': {'faceid_v2': ('BOOLEAN', {'default': False}), 'weight_v2': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05})}}
    RETURN_TYPES = ('REGIONAL_IPADAPTER', 'MASK')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Regional'

    def doit(self, color_mask, mask_color, image, weight, noise, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False, faceid_v2=False, weight_v2=False):
        mask = color_to_mask(color_mask, mask_color)
        cond = IPAdapterConditioning(mask, weight, weight_type, noise=noise, image=image, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch, faceid_v2=faceid_v2, weight_v2=weight_v2)
        return (cond, mask)
```