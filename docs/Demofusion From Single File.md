# Documentation
- Class name: DemofusionFromSingleFile
- Category: tests
- Output node: False
- Repo Ref: https://github.com/deroberon/demofusion-comfyui

该节点促进了图像生成的扩散模型的执行，利用预训练的检查点根据文本提示合成新的视觉内容。它强调节点在创意AI应用中的作用，聚焦于生成过程而不深入具体实施细节。

# Input types
## Required
- ckpt_name
    - 检查点名称参数对于指定用于图像生成的预训练模型至关重要。它指导节点定位和加载适当的模型权重和配置，这对于后续的生成过程至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- positive
    - 正面参数作为一个文本提示，指导图像生成过程。它的重要性在于为输出设定了主题方向，影响了合成图像的整体风格和内容。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面参数作为图像生成的排除性过滤器，使输出远离某些元素或主题。它通过指定最终结果中应避免的方面来细化创作方向。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - 宽度参数决定了生成图像的水平分辨率，影响整体的细节和质量。它在确定输出的比例和尺寸方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置了图像的垂直分辨率，与宽度一起确定生成过程的画布大小。它是输出最终尺寸的组成部分。
    - Comfy dtype: INT
    - Python dtype: int
- inference_steps
    - 推理步数参数控制扩散过程中使用的迭代次数，直接影响生成图像的复杂性和精细度。它是实现期望细节水平的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整模型的配置设置，微调生成过程以实现特定的视觉效果。它影响生成内容的风格输出和一致性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 种子参数通过使用固定值初始化随机数生成器来确保结果的可复现性。它对于在不同运行中进行一致的实验和结果比较至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出图像是节点功能的顶峰，封装了基于提供的文本提示和模型配置生成的视觉内容。它是创作过程的主要结果，展示了节点合成新图像的能力。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class DemofusionFromSingleFile:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (folder_paths.get_filename_list('checkpoints'),), 'positive': ('STRING', {'multiline': True, 'default': ''}), 'negative': ('STRING', {'multiline': True, 'default': ''}), 'width': ('INT', {'default': 2048, 'min': 2048, 'max': 4096, 'step': 64, 'display': 'number'}), 'height': ('INT', {'default': 2048, 'min': 2048, 'max': 4096, 'step': 64, 'display': 'number'}), 'inference_steps': ('INT', {'default': 40, 'min': 1, 'max': 100, 'step': 1, 'display': 'number'}), 'cfg': ('FLOAT', {'default': 7.5, 'min': 1.0, 'max': 20.0, 'step': 0.5, 'round': 0.001, 'display': 'number'}), 'seed': ('INT', {'default': 522, 'display': 'number'})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'execute'
    CATEGORY = 'tests'

    def execute(self, ckpt_name, positive, negative, width, height, inference_steps, cfg, seed):
        ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
        pipe = DemoFusionSDXLStableDiffusionPipeline.from_single_file(ckpt_path, torch_dtype=torch.float16, use_safetensors=True)
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