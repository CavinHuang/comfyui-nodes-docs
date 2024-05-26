# Documentation
- Class name: WLSH_Generate_Edge_Mask
- Category: WLSH Nodes/inpainting
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Generate_Edge_Mask节点负责根据给定的方向和图像生成边缘遮罩。它创建一个掩码，可用于修复任务，确保掩蔽区域与指定的方向对齐，例如'up'、'down'、'left'或'right'。节点的功能对于需要选择性掩蔽的图像处理应用至关重要。

# Input types
## Required
- image
    - 图像参数对于节点至关重要，因为它是生成边缘掩码的基础。节点处理此图像以创建与指定方向相对应的掩码，在节点的整体功能中起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- direction
    - 方向参数决定了要生成的掩码的方向。它是一个关键的输入，因为它决定了掩码将如何应用于图像，影响修复过程的最终结果。
    - Comfy dtype: STRING
    - Python dtype: str
- pixels
    - 像素参数指定掩码边缘的大小，以像素为单位，这是控制掩蔽区域范围的重要因素。此参数直接影响节点的执行和生成的掩码的精度。
    - Comfy dtype: INT
    - Python dtype: int
- overlap
    - 重叠参数定义了掩码边缘的厚度，这对于确保掩蔽区域和未掩蔽区域之间的平滑过渡非常重要。它通过防止边缘突变，有助于提高修复结果的质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 输出掩码是节点操作的关键结果。它代表了将要进行修复处理的区域，其质量和对齐方式直接影响最终图像输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Generate_Edge_Mask:
    directions = ['left', 'right', 'up', 'down']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'direction': (s.directions,), 'pixels': ('INT', {'default': 128, 'min': 32, 'max': 512, 'step': 32}), 'overlap': ('INT', {'default': 64, 'min': 16, 'max': 256, 'step': 16})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'gen_second_mask'
    CATEGORY = 'WLSH Nodes/inpainting'

    def gen_second_mask(self, direction, image, pixels, overlap):
        image = tensor2pil(image)
        (new_width, new_height) = image.size
        mask2 = Image.new('RGBA', (new_width, new_height), (0, 0, 0, 255))
        mask_thickness = overlap
        if direction == 'up':
            new_mask = Image.new('RGBA', (new_width, mask_thickness), (0, 122, 0, 255))
            mask2.paste(new_mask, (0, pixels - int(mask_thickness / 2)))
        elif direction == 'down':
            new_mask = Image.new('RGBA', (new_width, mask_thickness), (0, 122, 0, 255))
            mask2.paste(new_mask, (0, new_height - pixels - int(mask_thickness / 2)))
        elif direction == 'left':
            new_mask = Image.new('RGBA', (mask_thickness, new_height), (0, 122, 0, 255))
            mask2.paste(new_mask, (pixels - int(mask_thickness / 2), 0))
        elif direction == 'right':
            new_mask = Image.new('RGBA', (mask_thickness, new_height), (0, 122, 0, 255))
            mask2.paste(new_mask, (new_width - pixels - int(mask_thickness / 2), 0))
        mask2 = mask2.filter(ImageFilter.GaussianBlur(radius=5))
        mask2 = np.array(mask2).astype(np.float32) / 255.0
        mask2 = torch.from_numpy(mask2)[None,]
        return (mask2,)
```