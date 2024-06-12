---
tags:
- LoRA
---

# Intrinsic_lora_sampling
## Documentation
- Class name: `Intrinsic_lora_sampling`
- Category: `KJNodes`
- Output node: `False`

This node integrates intrinsic LoRAs (Low-Rank Adaptations) into a given model to perform specialized sampling tasks, such as generating depth maps, surface normals, albedo, and shading. It leverages intrinsic LoRAs to modify the model's behavior for specific visual tasks, enabling the generation of images with detailed attributes based on the selected task.
## Input types
### Required
- **`model`**
    - The model to which intrinsic LoRAs will be applied, modifying its behavior for specific visual tasks.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`lora_name`**
    - The name of the intrinsic LoRa to be loaded and applied to the model, chosen from a predefined list of available LoRAs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`task`**
    - Specifies the visual task for which the image is generated, such as depth map, surface normals, albedo, or shading, influencing the modification applied to the model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`text`**
    - Text input that, combined with the task, guides the image generation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - A CLIP model used for text encoding, aiding in the generation process by providing text-based guidance.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - A VAE model used for decoding the sampled latent representations into images.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`per_batch`**
    - The number of samples processed per batch, affecting the efficiency and speed of the image generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image`**
    - An optional image input for tasks that require an initial image, providing a starting point for the generation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`optional_latent`**
    - An optional latent representation that can be used as a starting point for the generation process, bypassing the need for an initial image.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated image with attributes specified by the task, such as depth map or surface normals.
    - Python dtype: `torch.Tensor`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent representation of the generated image, providing insight into the model's internal representation.
    - Python dtype: `Dict[str, torch.Tensor]`
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
