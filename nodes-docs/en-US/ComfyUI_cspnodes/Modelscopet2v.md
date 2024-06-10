# Modelscope t2v
## Documentation
- Class name: `Modelscopet2v`
- Category: `cspnodes/modelscope`
- Output node: `False`

The Modelscopet2v node is designed for transforming text inputs into visual outputs, leveraging advanced models to interpret and visualize textual descriptions in a visual format. This node encapsulates the process of text-to-visual conversion, enabling the creation of images or visual representations based on textual input.
## Input types
### Required
- **`prompt`**
    - The 'prompt' parameter specifies the textual input that describes the desired visual output. It plays a key role in guiding the model towards generating images that align with the given description, directly influencing the thematic and stylistic aspects of the generated visual content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_prompt`**
    - The 'negative_prompt' parameter provides textual input that describes undesired aspects of the visual output. It helps in refining the generated images by steering the model away from unwanted characteristics, thus fine-tuning the final visual representation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`model_path`**
    - Specifies the path to the model used for generating visual content. This parameter allows for the selection of different models, potentially offering various styles or capabilities.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`num_inference_steps`**
    - Determines the number of steps the model will take during the inference process. A higher number of steps can lead to more detailed and coherent visual outputs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`guidance_scale`**
    - Controls the degree to which the model adheres to the prompt. A higher guidance scale can result in images that more closely match the provided description.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - Sets the random seed for generating visual content, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - Specifies the width of the generated visual content in pixels.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the generated visual content in pixels.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`num_frames`**
    - Determines the number of frames to be generated for video content, defining the length of the output video.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - This output represents the generated visual content based on the textual descriptions provided as input. It encapsulates the text-to-visual conversion logic, producing images or video frames.
    - Python dtype: `torch.Tensor`
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
