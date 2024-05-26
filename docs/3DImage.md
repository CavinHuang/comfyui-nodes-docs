# Documentation
- Class name: Image3D
- Category: ♾️Mixlab/Image
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

Image3D节点旨在处理和操作3D图像。它接受一个base64编码的图像和可选的材料作为输入，将它们转换为适合深度学习模型进一步处理的张量形式。该节点还处理掩码和背景图像的提取，提供一套全面的图像操作功能。

# Input types
## Required
- upload
    - ‘upload’参数对于节点至关重要，因为它包含base64编码的图像数据和可选的材料进行处理。它对节点的执行至关重要，因为它提供了图像操作的主要输入。
    - Comfy dtype: Dict[str, str]
    - Python dtype: Dict[str, Union[str, torch.Tensor]]
- material
    - ‘material’参数是可选的，允许包含可以用于增强主要图像处理过程的额外图像数据。它通过启用补充视觉元素的使用，增加了节点功能的灵活性。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[torch.Tensor]

# Output types
- IMAGE
    - ‘IMAGE’输出代表以张量形式处理的3D图像，可用于机器学习或计算机视觉应用等下游任务。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- MASK
    - ‘MASK’输出提供了从输入图像派生的二进制掩码，可用于分割或其他图像分析任务。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- BG_IMAGE
    - ‘BG_IMAGE’输出是可选的背景图像，它补充了主要图像，为某些应用增强了上下文。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[torch.Tensor]
- MATERIAL
    - ‘MATERIAL’输出是处理过的材料图像，可以与主要图像一起用于更复杂的图像处理任务。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class Image3D:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'upload': ('THREED',)}, 'optional': {'material': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE', 'MASK', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('IMAGE', 'MASK', 'BG_IMAGE', 'MATERIAL')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Image'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False, False, False, False)
    OUTPUT_NODE = True

    def run(self, upload, material=None):
        image = base64_to_image(upload['image'])
        mat = None
        if 'material' in upload and upload['material']:
            mat = base64_to_image(upload['material'])
            mat = mat.convert('RGB')
            mat = pil2tensor(mat)
        mask = image.split()[3]
        image = image.convert('RGB')
        mask = mask.convert('L')
        bg_image = None
        if 'bg_image' in upload and upload['bg_image']:
            bg_image = base64_to_image(upload['bg_image'])
            bg_image = bg_image.convert('RGB')
            bg_image = pil2tensor(bg_image)
        mask = pil2tensor(mask)
        image = pil2tensor(image)
        m = []
        if not material is None:
            m = create_temp_file(material[0])
        return {'ui': {'material': m}, 'result': (image, mask, bg_image, mat)}
```