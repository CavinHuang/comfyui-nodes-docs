---
tags:
- DepthMap
- Image
- Inpaint
---

# EasyKSampler (Inpainting)
## Documentation
- Class name: `easy kSamplerInpainting`
- Category: `EasyUse/Sampler`
- Output node: `True`

The 'easy kSamplerInpainting' node specializes in generating inpainted images by seamlessly integrating specified patches or modifications into existing images. It leverages advanced sampling techniques to ensure the inpainted areas blend naturally with the untouched parts of the image, making it ideal for tasks such as object removal, restoration, or creative alterations.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline configuration for image processing, including model and image data. It's crucial for defining the flow and parameters of the inpainting task.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`grow_mask_by`**
    - Specifies the number of pixels by which to expand the inpainting mask, allowing for smoother transitions and better integration of the inpainted area with the surrounding image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_output`**
    - Determines the output behavior of the inpainted image, offering options such as previewing, saving, or sending the result.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`link_id`**
    - A unique identifier for linking the inpainting task with other processes or outputs, facilitating workflow integration.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`save_prefix`**
    - Defines a prefix for the saved image file names, helping organize and identify inpainted images easily.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`additional`**
    - Allows for the selection of additional processing options like differential diffusion or specific model conditioning, further customizing the inpainting results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`model`**
    - The model used for inpainting, essential for processing the image and applying the inpainting algorithm.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
- **`mask`**
    - The mask that defines the area to be inpainted, crucial for targeting specific parts of the image for modification.
    - Comfy dtype: `MASK`
    - Python dtype: `object`
- **`patch`**
    - An optional patch to be applied during inpainting, allowing for specific modifications or corrections in the image.
    - Comfy dtype: `INPAINT_PATCH`
    - Python dtype: `object`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The updated pipeline configuration after inpainting, including any changes to the model or image data.
    - Python dtype: `dict`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting inpainted image, showcasing the seamless integration of modifications with the original image.
    - Python dtype: `object`
- **`vae`**
    - Comfy dtype: `VAE`
    - The variational autoencoder used in the inpainting process, potentially updated during the operation.
    - Python dtype: `object`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class samplerSimpleInpainting:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {"pipe": ("PIPE_LINE",),
                 "grow_mask_by": ("INT", {"default": 6, "min": 0, "max": 64, "step": 1}),
                 "image_output": (["Hide", "Preview", "Save", "Hide&Save", "Sender", "Sender&Save"],{"default": "Preview"}),
                 "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                 "save_prefix": ("STRING", {"default": "ComfyUI"}),
                 "additional": (["None", "Differential Diffusion", "Only InpaintModelConditioning"],{"default": "None"})
                 },
                "optional": {
                    "model": ("MODEL",),
                    "mask": ("MASK",),
                    "patch": ("INPAINT_PATCH",),
                },
                "hidden":
                  {"tile_size": "INT", "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                    "embeddingsList": (folder_paths.get_filename_list("embeddings"),)
                  }
                }

    RETURN_TYPES = ("PIPE_LINE", "IMAGE", "VAE")
    RETURN_NAMES = ("pipe", "image", "vae")
    OUTPUT_NODE = True
    FUNCTION = "run"
    CATEGORY = "EasyUse/Sampler"

    def run(self, pipe, grow_mask_by, image_output, link_id, save_prefix, additional, model=None, mask=None, patch=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):
        fooocus_model = None
        model = model if model is not None else pipe['model']
        latent = pipe['samples'] if 'samples' in pipe else None
        positive = pipe['positive']
        negative = pipe['negative']
        pixels = pipe["images"] if pipe and "images" in pipe else None
        vae = pipe["vae"] if pipe and "vae" in pipe else None
        if 'noise_mask' in latent and mask is None:
            mask = latent['noise_mask']
        else:
            if pixels is None:
                raise Exception("No Images found")
            if vae is None:
                raise Exception("No VAE found")
            latent, = VAEEncodeForInpaint().encode(vae, pixels, mask, grow_mask_by)
            mask = latent['noise_mask']

        if mask is not None:
            if additional != "None":

                positive, negative, latent = InpaintModelConditioning().encode(positive, negative, pixels, vae, mask)
                if additional == "Differential Diffusion":
                    cls = ALL_NODE_CLASS_MAPPINGS['DifferentialDiffusion']
                    if cls is not None:
                        model, = cls().apply(model)
                    else:
                        raise Exception("Differential Diffusion not found,please update comfyui")

            # when patch was linked
            fooocus_model = None
            if patch is not None:
                worker = InpaintWorker(node_name="easy kSamplerInpainting")
                fooocus_model, = worker.patch(model, latent, patch)

            new_pipe = {
                **pipe,
                "model": fooocus_model if fooocus_model else model,
                "positive": positive,
                "negative": negative,
                "vae": vae,
                "samples": latent,
                "loader_settings": pipe["loader_settings"],
            }

        else:
            new_pipe = pipe
        del pipe

        return samplerFull().run(new_pipe, None, None,None,None,None, image_output, link_id, save_prefix,
                               None, None, None, None, None, None, None, None,
                               tile_size, prompt, extra_pnginfo, my_unique_id, force_full_denoise, disable_noise)

```
