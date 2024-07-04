
# Documentation
- Class name: Modelscopet2v
- Category: cspnodes/modelscope
- Output node: False

Modelscopet2v节点专门用于将文本输入转换为视觉输出，利用先进的模型来解释和可视化文本描述。该节点封装了文本到视觉的转换过程，能够基于文本输入创建图像或视觉表示。

# Input types
## Required
- prompt
    - prompt参数指定描述所需视觉输出的文本输入。它在引导模型生成与给定描述相符的图像方面起着关键作用，直接影响生成的视觉内容的主题和风格特征。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - negative_prompt参数提供描述视觉输出中不希望出现的方面的文本输入。它通过引导模型避开不想要的特征来帮助优化生成的图像，从而调整最终的视觉表现。
    - Comfy dtype: STRING
    - Python dtype: str
- model_path
    - 指定用于生成视觉内容的模型路径。此参数允许选择不同的模型，可能提供各种风格或功能。
    - Comfy dtype: STRING
    - Python dtype: str
- num_inference_steps
    - 确定模型在推理过程中将采取的步骤数。更高的步骤数可能导致更详细和连贯的视觉输出。
    - Comfy dtype: INT
    - Python dtype: int
- guidance_scale
    - 控制模型遵循提示的程度。较高的引导比例可能会产生与提供的描述更匹配的图像。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 设置生成视觉内容的随机种子，确保结果的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 指定生成的视觉内容的宽度（以像素为单位）。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定生成的视觉内容的高度（以像素为单位）。
    - Comfy dtype: INT
    - Python dtype: int
- num_frames
    - 确定要为视频内容生成的帧数，定义输出视频的长度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 此输出代表基于输入的文本描述生成的视觉内容。它封装了文本到视觉的转换逻辑，生成图像或视频帧。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Modelscopet2v:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt": ("STRING", {}),
                "negative_prompt": ("STRING", {"default": None}),
                "model_path": ("STRING", {"default": "cerspense/zeroscope_v2_576w"}),
                "num_inference_steps": ("INT", {"default": 25}),
                "guidance_scale": ("FLOAT", {"default": 9.0}),
                "seed": ("INT", {"default": 42}),
                "width": ("INT", {"default": 576}),
                "height": ("INT", {"default": 320}),
                "num_frames": ("INT", {"default": 24}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "generate_video_frames"
    CATEGORY = "cspnodes/modelscope"

    def generate_video_frames(self, prompt, model_path, num_inference_steps, height, width, num_frames, guidance_scale, negative_prompt, seed):
        # Set up the generator for deterministic results if seed is provided
        generator = torch.Generator()
        if seed is not None:
            generator.manual_seed(seed)

        pipe = DiffusionPipeline.from_pretrained(model_path, torch_dtype=torch.float16)
        pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
        pipe.enable_model_cpu_offload()

        # Added generator to the pipe call
        video_frames = pipe(prompt, num_inference_steps=num_inference_steps, height=height, width=width, num_frames=num_frames, guidance_scale=guidance_scale, negative_prompt=negative_prompt, generator=generator).frames
        
        # Ensure video_frames is a PyTorch tensor
        if not isinstance(video_frames, torch.Tensor):
            video_frames = torch.tensor(video_frames, dtype=torch.float32)

        # Normalize the tensor to have values between 0 and 1 if they are in the range 0-255
        if video_frames.max() > 1.0:
            video_frames = video_frames / 255.0

        # Remove the unnecessary batch dimension explicitly and permute the dimensions
        # The expected shape is (num_frames, height, width, channels)
        video_frames = video_frames.squeeze(0).permute(0, 1, 2, 3)

        # Convert the tensor to CPU and to uint8 if it's not already
        video_frames = video_frames.to('cpu')

        # return (video_frames_numpy,)
        return (video_frames,)

```
