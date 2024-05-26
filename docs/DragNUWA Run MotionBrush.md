# Documentation
- Class name: DragNUWARunMotionBrush
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点通过将从画笔输入推断出的运动应用到静态图像上，模拟动态效果，旨在增强图像中运动的视觉表现力，通过整合用户提供的运动数据，使得创建动态或交互式视觉内容成为可能。

# Input types
## Required
- model
    - 模型参数对于节点的运行至关重要，因为它定义了用于处理图像和应用运动效果的基础架构和参数。
    - Comfy dtype: DragNUWA
    - Python dtype: DragNUWA
- image
    - 图像参数是必需的，因为它提供了节点将要操作的基础视觉内容，以模拟运动。其属性直接影响输出的质量以及运动模拟的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- motion_brush
    - motion_brush参数对于节点的功能至关重要，因为它提供了将要应用到图像上的运动数据。其结构和内容直接影响最终的运动效果。
    - Comfy dtype: MotionBrush
    - Python dtype: MotionBrush
- inference_batch_size
    - 该参数通过控制推理过程中的批处理大小来优化节点的处理，影响运动模拟的计算效率和速度。
    - Comfy dtype: INT
    - Python dtype: int
- motion_bucket_id
    - motion_bucket_id参数很重要，因为它标识了运动桶中要用于模拟的具体运动数据，指导节点创建所需的视觉结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 该节点的输出是增强后的图像或一系列图像，它们在视觉上代表了应用到输入图像的运动效果，展示了节点模拟动态视觉内容的能力。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class DragNUWARunMotionBrush:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('DragNUWA',), 'image': ('IMAGE',), 'motion_brush': ('MotionBrush',), 'inference_batch_size': ('INT', {'default': 1, 'min': 1, 'max': 1}), 'motion_bucket_id': ('INT', {'default': 4, 'min': 1, 'max': 100})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, model, image, motion_brush, inference_batch_size, motion_bucket_id):
        image = 255.0 * image[0].cpu().numpy()
        image_pil = Image.fromarray(np.clip(image, 0, 255).astype(np.uint8))
        (raw_w, raw_h) = image_pil.size
        resize_ratio = max(model.width / raw_w, model.height / raw_h)
        image_pil = image_pil.resize((int(raw_w * resize_ratio), int(raw_h * resize_ratio)), Image.BILINEAR)
        image_pil = transforms.CenterCrop((model.height, model.width))(image_pil.convert('RGB'))
        return model.run_brush(image_pil, motion_brush, inference_batch_size, motion_bucket_id)
```