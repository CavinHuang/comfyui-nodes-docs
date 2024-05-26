# Documentation
- Class name: TripoSRSampler
- Category: Flowty TripoSR
- Output node: False
- Repo Ref: https://github.com/flowtyone/ComfyUI-Flowty-TripoSR

TripoSRSampler类通过利用深度学习模型的能力来解释场景代码和提取几何细节，从而促进了从2D图像生成3D网格的过程。它将视觉数据转换为结构化表示，使得在计算机视觉和图形渲染等各个领域中的应用成为可能。

# Input types
## Required
- model
    - 模型参数对于TripoSRSampler至关重要，它包含了使2D图像转换为3D网格的训练有素的神经网络。它是整个过程的主干，决定了最终输出的质量和准确性。
    - Comfy dtype: TRIPOSR_MODEL
    - Python dtype: torch.nn.Module
- reference_image
    - 参考图像是3D网格生成过程的主要输入。对于模型来说，它对于解释和提取创建场景准确表示所需的必要几何信息至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- geometry_resolution
    - 几何分辨率是一个关键参数，它影响生成的3D网格的细节水平。更高的分辨率会产生更复杂和细粒度的输出，这对于需要高精度的应用来说至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- threshold
    - 阈值参数在确定提取的3D结构的对比度和清晰度方面起着重要作用。它影响模型如何在场景中区分不同元素，影响最终的视觉结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- reference_mask
    - 参考掩码在提供时，通过指定图像中的兴趣区域，有助于完善3D网格生成。它帮助模型专注于场景的相关部分，提高了输出的准确性。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- mesh
    - 输出网格是3D采样过程的有形成果，代表了输入图像到几何结构的转换。它是进一步分析、可视化和在各个领中应用的关键组成部分。
    - Comfy dtype: MESH
    - Python dtype: trimesh.Trimesh

# Usage tips
- Infra type: GPU

# Source code
```
class TripoSRSampler:

    def __init__(self):
        self.initialized_model = None

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('TRIPOSR_MODEL',), 'reference_image': ('IMAGE',), 'geometry_resolution': ('INT', {'default': 256, 'min': 128, 'max': 12288}), 'threshold': ('FLOAT', {'default': 25.0, 'min': 0.0, 'step': 0.01})}, 'optional': {'reference_mask': ('MASK',)}}
    RETURN_TYPES = ('MESH',)
    FUNCTION = 'sample'
    CATEGORY = 'Flowty TripoSR'

    def sample(self, model, reference_image, geometry_resolution, threshold, reference_mask=None):
        device = get_torch_device()
        if not torch.cuda.is_available():
            device = 'cpu'
        image = reference_image[0]
        if reference_mask is not None:
            mask = reference_mask[0].unsqueeze(2)
            image = torch.cat((image, mask), dim=2).detach().cpu().numpy()
        else:
            image = image.detach().cpu().numpy()
        image = Image.fromarray(np.clip(255.0 * image, 0, 255).astype(np.uint8))
        if reference_mask is not None:
            image = fill_background(image)
        image = image.convert('RGB')
        scene_codes = model([image], device)
        meshes = model.extract_mesh(scene_codes, resolution=geometry_resolution, threshold=threshold)
        return ([meshes[0]],)
```