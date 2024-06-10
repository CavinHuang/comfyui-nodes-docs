---
tags:
- Loader
- ModelIO
---

# BLIP Analyze Image
## Documentation
- Class name: `BLIP Analyze Image`
- Category: `WAS Suite/Text/AI`
- Output node: `False`

The node provides functionality for analyzing images using the BLIP model, capable of generating captions or answering questions about the image content. It leverages pre-trained BLIP models for either caption generation or visual question answering, depending on the mode selected.
## Input types
### Required
- **`image`**
    - The image to be analyzed by the BLIP model. It is the primary input that determines the content of the generated caption or the context for the question answering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mode`**
    - Specifies the operation mode of the BLIP model, either generating captions for the image or answering questions about it. This mode selection alters the model's behavior and output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`question`**
    - The question to be answered about the image, required when the mode is set to 'interrogate' for visual question answering.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`blip_model`**
    - An optional parameter specifying a pre-loaded BLIP model to be used for analysis, allowing for customization and efficiency improvements.
    - Comfy dtype: `BLIP_MODEL`
    - Python dtype: `torch.nn.Module`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output from the BLIP model, which can be either a caption describing the image or an answer to a question posed about the image content.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ShowText|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ShowText|pysssss.md)



## Source code
```python
class WAS_BLIP_Analyze_Image:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "mode": (["caption", "interrogate"], ),
                "question": ("STRING", {"default": "What does the background consist of?", "multiline": True}),
            },
            "optional": {
                "blip_model": ("BLIP_MODEL",)
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "blip_caption_image"

    CATEGORY = "WAS Suite/Text/AI"

    def blip_caption_image(self, image, mode, question, blip_model=None):

        def transformImage(input_image, image_size, device):
            raw_image = input_image.convert('RGB')
            raw_image = raw_image.resize((image_size, image_size))
            transform = transforms.Compose([
                transforms.Resize(raw_image.size, interpolation=InterpolationMode.BICUBIC),
                transforms.ToTensor(),
                transforms.Normalize((0.48145466, 0.4578275, 0.40821073), (0.26862954, 0.26130258, 0.27577711))
            ])
            image = transform(raw_image).unsqueeze(0).to(device)
            return image.view(1, -1, image_size, image_size)  # Change the shape of the output tensor

        from torchvision import transforms
        from torchvision.transforms.functional import InterpolationMode

        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

        conf = getSuiteConfig()
        image = tensor2pil(image)
        size = 384
        tensor = transformImage(image, size, device)

        if blip_model:
            mode = blip_model[1]

        if mode == 'caption':

            if blip_model:
                model = blip_model[0].to(device)
            else:
                from .modules.BLIP.blip_module import blip_decoder

                blip_dir = os.path.join(MODELS_DIR, 'blip')
                if not os.path.exists(blip_dir):
                    os.makedirs(blip_dir, exist_ok=True)

                torch.hub.set_dir(blip_dir)

                if conf.__contains__('blip_model_url'):
                    model_url = conf['blip_model_url']
                else:
                    model_url = 'https://storage.googleapis.com/sfr-vision-language-research/BLIP/models/model_base_capfilt_large.pth'

                model = blip_decoder(pretrained=model_url, image_size=size, vit='base')
                model.eval()
                model = model.to(device)

            with torch.no_grad():
                caption = model.generate(tensor, sample=False, num_beams=6, max_length=74, min_length=20)
                # nucleus sampling
                #caption = model.generate(tensor, sample=True, top_p=0.9, max_length=75, min_length=10)
                cstr(f"\033[33mBLIP Caption:\033[0m {caption[0]}").msg.print()
                return (caption[0], )

        elif mode == 'interrogate':

            if blip_model:
                model = blip_model[0].to(device)
            else:
                from .modules.BLIP.blip_module import blip_vqa

                blip_dir = os.path.join(MODELS_DIR, 'blip')
                if not os.path.exists(blip_dir):
                    os.makedirs(blip_dir, exist_ok=True)

                torch.hub.set_dir(blip_dir)

                if conf.__contains__('blip_model_vqa_url'):
                    model_url = conf['blip_model_vqa_url']
                else:
                    model_url = 'https://storage.googleapis.com/sfr-vision-language-research/BLIP/models/model_base_vqa_capfilt_large.pth'

                model = blip_vqa(pretrained=model_url, image_size=size, vit='base')
                model.eval()
                model = model.to(device)

            with torch.no_grad():
                answer = model(tensor, question, train=False, inference='generate')
                cstr(f"\033[33m BLIP Answer:\033[0m {answer[0]}").msg.print()
                return (answer[0], )

        else:
            cstr(f"The selected mode `{mode}` is not a valid selection!").error.print()
            return ('Invalid BLIP mode!', )

```
