# Modelscope v2v
## Documentation
- Class name: `Modelscopev2v`
- Category: `cspnodes/modelscope`
- Output node: `False`

The Modelscopev2v node is designed to transform visual content from one domain to another, leveraging advanced models to understand and manipulate visual data at a high level. It focuses on enabling complex visual transformations and enhancements, making it suitable for tasks that require deep understanding and modification of visual information.
## Input types
### Required
- **`video_frames`**
    - Specifies the video frames to be transformed. Essential for defining the visual content that will undergo transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`prompt`**
    - A textual description of the desired transformation or outcome, guiding the model's understanding and manipulation of the visual content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_prompt`**
    - A textual description of undesired elements or outcomes, helping to steer the model away from certain transformations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`model_path`**
    - The path to the model used for the transformation, determining the specific capabilities and characteristics of the transformation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`strength`**
    - Controls the intensity of the transformation, allowing for fine-tuning of the visual output's adherence to the prompt.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`num_inference_steps`**
    - Determines the number of steps the model takes to perform the transformation, affecting the quality and detail of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`guidance_scale`**
    - Adjusts the influence of the prompt on the transformation, balancing between fidelity to the prompt and the original content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the transformation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`enable_forward_chunking`**
    - Enables or disables forward chunking, potentially improving performance for large video frames.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`enable_vae_slicing`**
    - Enables or disables VAE slicing, which can affect the model's efficiency and output quality.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed video frames, representing the visual content after undergoing the specified transformation.
    - Python dtype: `List[torch.Tensor]`
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
