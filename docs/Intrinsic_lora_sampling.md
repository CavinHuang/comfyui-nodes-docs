
# Documentation
- Class name: `Intrinsic_lora_sampling`
- Category: `KJNodes`
- Output node: `False`

Intrinsic_lora_sampling节点将内在LoRA（Low-Rank Adaptations）整合到给定模型中，以执行专门的采样任务，如生成深度图、表面法线、反照率和阴影。它利用内在LoRA修改模型的行为以适应特定的视觉任务，从而能够基于所选任务生成具有详细属性的图像。

# Input types
## Required
- **`model`**
    - 将应用内在LoRA的模型，用于修改其行为以适应特定的视觉任务。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- **`lora_name`**
    - 要加载并应用于模型的内在LoRA的名称，从预定义的可用LoRA列表中选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- **`task`**
    - 指定生成图像的视觉任务，如深度图、表面法线、反照率或阴影，影响应用于模型的修改。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- **`text`**
    - 文本输入，与任务结合，引导图像生成过程。
    - Comfy dtype: STRING
    - Python dtype: str
- **`clip`**
    - 用于文本编码的CLIP模型，通过提供基于文本的指导来辅助生成过程。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- **`vae`**
    - 用于将采样的潜在表示解码为图像的VAE模型。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- **`per_batch`**
    - 每批处理的样本数，影响图像生成过程的效率和速度。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- **`image`**
    - 可选的图像输入，用于需要初始图像的任务，为生成过程提供起点。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- **`optional_latent`**
    - 可选的潜在表示，可用作生成过程的起点，避免了对初始图像的需求。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- **`image`**
    - 生成的图像，具有由任务指定的属性，如深度图或表面法线。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- **`latent`**
    - 生成图像的潜在表示，提供对模型内部表示的洞察。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Intrinsic_lora_sampling:
    def __init__(self):
        self.loaded_lora = None
        
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                "lora_name": (folder_paths.get_filename_list("intristic_loras"), ),
                "task": (
                [   
                    'depth map',
                    'surface normals',
                    'albedo',
                    'shading',
                ],
                {
                "default": 'depth map'
                    }),
                "text": ("STRING", {"multiline": True, "default": ""}),
                "clip": ("CLIP", ),
                "vae": ("VAE", ),
                "per_batch": ("INT", {"default": 16, "min": 1, "max": 4096, "step": 1}),
        },
            "optional": {
            "image": ("IMAGE",),
            "optional_latent": ("LATENT",),
            },
        }

    RETURN_TYPES = ("IMAGE", "LATENT",)
    FUNCTION = "onestepsample"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Sampler to use the intrinsic loras:  
https://github.com/duxiaodan/intrinsic-lora  
These LoRAs are tiny and thus included  
with this node pack.
"""

    def onestepsample(self, model, lora_name, clip, vae, text, task, per_batch, image=None, optional_latent=None):
        pbar = comfy.utils.ProgressBar(3)

        if optional_latent is None:
            image_list = []
            for start_idx in range(0, image.shape[0], per_batch):
                sub_pixels = vae.vae_encode_crop_pixels(image[start_idx:start_idx+per_batch])
                image_list.append(vae.encode(sub_pixels[:,:,:,:3]))
            sample = torch.cat(image_list, dim=0)
        else:
            sample = optional_latent["samples"]
        noise = torch.zeros(sample.size(), dtype=sample.dtype, layout=sample.layout, device="cpu")
        prompt = task + "," + text
        positive, = CLIPTextEncode.encode(self, clip, prompt)
        negative = positive #negative shouldn't do anything in this scenario

        pbar.update(1)
     
        #custom model sampling to pass latent through as it is
        class X0_PassThrough(comfy.model_sampling.EPS):
            def calculate_denoised(self, sigma, model_output, model_input):
                return model_output
            def calculate_input(self, sigma, noise):
                return noise
        sampling_base = comfy.model_sampling.ModelSamplingDiscrete
        sampling_type = X0_PassThrough

        class ModelSamplingAdvanced(sampling_base, sampling_type):
            pass
        model_sampling = ModelSamplingAdvanced(model.model.model_config)

        #load lora
        model_clone = model.clone()
        lora_path = folder_paths.get_full_path("intristic_loras", lora_name)        
        lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
        self.loaded_lora = (lora_path, lora)

        model_clone_with_lora = comfy.sd.load_lora_for_models(model_clone, None, lora, 1.0, 0)[0]

        model_clone_with_lora.add_object_patch("model_sampling", model_sampling)

        samples = {"samples": comfy.sample.sample(model_clone_with_lora, noise, 1, 1.0, "euler", "simple", positive, negative, sample,
                                  denoise=1.0, disable_noise=True, start_step=0, last_step=1,
                                  force_full_denoise=True, noise_mask=None, callback=None, disable_pbar=True, seed=None)}
        pbar.update(1)

        decoded = []
        for start_idx in range(0, samples["samples"].shape[0], per_batch):
            decoded.append(vae.decode(samples["samples"][start_idx:start_idx+per_batch]))
        image_out = torch.cat(decoded, dim=0)

        pbar.update(1)

        if task == 'depth map':
            imax = image_out.max()
            imin = image_out.min()
            image_out = (image_out-imin)/(imax-imin)
            image_out = torch.max(image_out, dim=3, keepdim=True)[0].repeat(1, 1, 1, 3)
        elif task == 'surface normals':
            image_out = F.normalize(image_out * 2 - 1, dim=3) / 2 + 0.5
            image_out = 1.0 - image_out
        else:
            image_out = image_out.clamp(-1.,1.)
            
        return (image_out, samples,)

```
