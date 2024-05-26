# Documentation
- Class name: Demofusion
- Category: tests
- Output node: False
- Repo Ref: https://github.com/deroberon/demofusion-comfyui

该节点使用预训练的扩散模型执行图像生成，结合文本提示引导创作过程，并生成高分辨率输出。

# Input types
## Required
- ckpt_name
    - 检查点名称对于选择用于图像生成的预训练模型至关重要。它指导节点访问指定的模型架构和权重。
    - Comfy dtype: STRING
    - Python dtype: str
- positive
    - 正面提示作为指导文本，增强生成图像中期望的特征，将输出引向特定的视觉元素。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面提示有助于从生成的图像中排除不需要的元素，使输出更加符合预期的创作愿景。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - 宽度决定了生成图像的水平分辨率，影响输出的整体细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度决定了生成图像的垂直分辨率，影响最终产品的规模和宽高比。
    - Comfy dtype: INT
    - Python dtype: int
- inference_steps
    - 推理步骤定义了模型执行以完善图像的迭代次数，直接影响最终结果的细节和清晰度水平。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数（或cfg）调整模型的指导比例，控制文本提示对图像生成的影响强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 种子为随机数生成提供值，确保在不同运行中使用相同的种子时结果的可复现性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 输出是一张高分辨率的图像，包含了文本提示所提供的创作方向，代表了扩散模型生成能力的顶峰。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class Demofusion:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': ('STRING', {'multiline': False, 'default': 'stabilityai/stable-diffusion-xl-base-1.0'}), 'positive': ('STRING', {'multiline': True, 'default': ''}), 'negative': ('STRING', {'multiline': True, 'default': ''}), 'width': ('INT', {'default': 2048, 'min': 2048, 'max': 4096, 'step': 64, 'display': 'number'}), 'height': ('INT', {'default': 2048, 'min': 2048, 'max': 4096, 'step': 64, 'display': 'number'}), 'inference_steps': ('INT', {'default': 40, 'min': 1, 'max': 100, 'step': 1, 'display': 'number'}), 'cfg': ('FLOAT', {'default': 7.5, 'min': 1.0, 'max': 20.0, 'step': 0.5, 'round': 0.001, 'display': 'number'}), 'seed': ('INT', {'default': 522, 'display': 'number'})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'execute'
    CATEGORY = 'tests'

    def execute(self, ckpt_name, positive, negative, width, height, inference_steps, cfg, seed):
        pipe = DemoFusionSDXLStableDiffusionPipeline.from_pretrained(ckpt_name, torch_dtype=torch.float16)
        pipe = pipe.to('cuda')
        generator = torch.Generator(device='cuda')
        generator = generator.manual_seed(seed)
        images = pipe(str(positive), negative_prompt=str(negative), height=height, width=width, view_batch_size=4, stride=64, num_inference_steps=inference_steps, guidance_scale=cfg, cosine_scale_1=3, cosine_scale_2=1, cosine_scale_3=1, sigma=0.8, multi_decoder=True, show_image=False)
        image = images[len(images) - 1]
        image = image.convert('RGB')
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        return (image,)
```