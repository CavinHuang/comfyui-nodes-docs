# Documentation
- Class name: DragNUWARun
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

DragNUWARun节点旨在执行高级图像处理和推理任务，利用预定义模型根据跟踪点和其他输入参数分析和操作图像数据。它旨在通过应用运动估计和光流技术来增强图像序列，有助于生成高质量的视觉输出。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了用于图像处理任务的基础架构和预训练权重。它决定了节点根据学习到的模式和特征解释和转换输入图像的能力。
    - Comfy dtype: DragNUWA
    - Python dtype: torch.nn.Module
- image
    - 图像输入对于节点执行其主要功能——图像分析和推理至关重要。它是模型将要处理的原始数据，其内容直接影响节点输出的质量和准确性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray
- tracking_points
    - 跟踪点对于节点至关重要，因为它们提供了模型理解和预测图像序列中运动所需的空间信息。它们用于指导转换和增强过程，确保输出与期望的运动动态一致。
    - Comfy dtype: STRING
    - Python dtype: str
- inference_batch_size
    - 推理批次大小参数通过确定同时处理多少图像来优化节点的处理效率。它影响计算资源和处理速度之间的权衡，从而影响节点的整体性能。
    - Comfy dtype: INT
    - Python dtype: int
- motion_bucket_id
    - 运动桶ID是一个关键参数，用于对运动类型进行分类，以便模型应用特定的转换。它通过从预定义集合中选择适当的运动配置文件，有助于在输出中实现期望的运动效果。
    - Comfy dtype: INT
    - Python dtype: int
- use_optical_flow
    - 使用光流参数启用或禁用光流技术的应用于运动估计。对于节点准确预测和模拟图像序列中的复杂运动非常重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- directory
    - 目录参数指定存储或检索光流数据的位置。对于节点访问必要的运动信息至关重要，这对于准确执行图像处理任务至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- output
    - 输出参数代表节点操作产生的最终处理过的图像或图像序列。它封装了节点转换和增强输入数据的能力，反映了应用模型和算法的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray

# Usage tips
- Infra type: GPU

# Source code
```
class DragNUWARun:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('DragNUWA',), 'image': ('IMAGE',), 'tracking_points': ('STRING', {'multiline': True, 'default': '[[[25,25],[128,128]]]'}), 'inference_batch_size': ('INT', {'default': 1, 'min': 1, 'max': 1}), 'motion_bucket_id': ('INT', {'default': 4, 'min': 1, 'max': 100}), 'use_optical_flow': ('BOOLEAN', {'default': False}), 'directory': ('STRING', {'default': 'X://path/to/optical_flow', 'vhs_path_extensions': []})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, model, image, tracking_points, inference_batch_size, motion_bucket_id, use_optical_flow, directory):
        image = 255.0 * image[0].cpu().numpy()
        image_pil = Image.fromarray(np.clip(image, 0, 255).astype(np.uint8))
        (raw_w, raw_h) = image_pil.size
        resize_ratio = max(model.width / raw_w, model.height / raw_h)
        image_pil = image_pil.resize((int(raw_w * resize_ratio), int(raw_h * resize_ratio)), Image.BILINEAR)
        image_pil = transforms.CenterCrop((model.height, model.width))(image_pil.convert('RGB'))
        tracking_points = json.loads(tracking_points)
        return model.run_2(image_pil, tracking_points, inference_batch_size, motion_bucket_id, use_optical_flow, directory)
```