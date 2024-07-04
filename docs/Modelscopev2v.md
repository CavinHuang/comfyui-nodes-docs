
# Documentation
- Class name: Modelscopev2v
- Category: cspnodes/modelscope
- Output node: False
- Repo Ref: https://github.com/modelscope/modelscope

Modelscopev2v节点旨在实现视觉内容的领域间转换，利用先进模型对视觉数据进行高级理解和操作。它专注于实现复杂的视觉转换和增强，适用于需要深度理解和修改视觉信息的任务。

# Input types
## Required
- video_frames
    - 指定需要转换的视频帧。这是定义将要进行转换的视觉内容的关键输入。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- prompt
    - 对所需转换或结果的文字描述，用于指导模型理解和操作视觉内容。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - 对不期望出现的元素或结果的文字描述，有助于引导模型避开某些转换方向。
    - Comfy dtype: STRING
    - Python dtype: str
- model_path
    - 用于转换的模型路径，决定了转换过程的具体能力和特性。
    - Comfy dtype: STRING
    - Python dtype: str
- strength
    - 控制转换的强度，允许微调视觉输出与提示的符合程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- num_inference_steps
    - 确定模型执行转换的步骤数，影响输出的质量和细节。
    - Comfy dtype: INT
    - Python dtype: int
- guidance_scale
    - 调整提示对转换的影响程度，平衡提示和原始内容之间的忠实度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 随机数生成的种子值，确保转换过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- enable_forward_chunking
    - 启用或禁用前向分块，可能会提高处理大型视频帧的性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- enable_vae_slicing
    - 启用或禁用VAE切片，可能会影响模型的效率和输出质量。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 转换后的视频帧，代表经过指定转换后的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Modelscopev2v:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "video_frames": ("IMAGE", {}),
                "prompt": ("STRING", {}),
                "negative_prompt": ("STRING", {"default": None}),
                "model_path": ("STRING", {"default": "cerspense/zeroscope_v2_XL"}),  
                "strength": ("FLOAT", {"default": 0.70}),
                "num_inference_steps": ("INT", {"default": 25}),
                "guidance_scale": ("FLOAT", {"default": 8.50}),
                "seed": ("INT", {"default": 42}),
                "enable_forward_chunking": ("BOOLEAN", {"default": False}),
                "enable_vae_slicing": ("BOOLEAN", {"default": True}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "transform_video_frames"
    CATEGORY = "cspnodes/modelscope"

    def transform_video_frames(self, video_frames, prompt, model_path, strength, num_inference_steps, guidance_scale, negative_prompt, seed, enable_forward_chunking, enable_vae_slicing):
        # Set up the generator for deterministic results if seed is provided
        generator = torch.Generator()
        if seed is not None:
            generator.manual_seed(seed)

        # Initialize the diffusion pipeline with the specified model path
        pipe = DiffusionPipeline.from_pretrained(model_path, torch_dtype=torch.float16)
        pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
        pipe.enable_model_cpu_offload()

        # Apply memory optimizations based on the toggles
        if enable_forward_chunking:
            pipe.unet.enable_forward_chunking(chunk_size=1, dim=1)
        if enable_vae_slicing:
            pipe.enable_vae_slicing()

        # Convert tensor to list of PIL Images
        # Assuming video_frames is a float tensor with values in [0, 1]
        video_frames_uint8 = (video_frames * 255).byte()
        video = [Image.fromarray(frame.numpy(), 'RGB') for frame in video_frames_uint8]

        # Generate new video frames
        video_frames = pipe(prompt, video=video, strength=strength, num_inference_steps=num_inference_steps, guidance_scale=guidance_scale, negative_prompt=negative_prompt, generator=generator).frames

        # Ensure video_frames is a PyTorch tensor
        if not isinstance(video_frames, torch.Tensor):
            video_frames = torch.tensor(video_frames, dtype=torch.float32)

        # Normalize the tensor to have values between 0 and 1 if they are in the range 0-255
        if video_frames.max() > 1.0:
            video_frames = video_frames / 255.0
        
        # The expected shape is (num_frames, height, width, channels)
        video_frames = video_frames.squeeze(0).permute(0, 1, 2, 3)

        # Convert the tensor to CPU and to uint8 if it's not already
        video_frames = video_frames.to('cpu')

        # return (video_frames_numpy,)
        return (video_frames,)

```
