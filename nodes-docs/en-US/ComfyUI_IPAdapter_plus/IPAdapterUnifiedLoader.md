---
tags:
- IPAdapter
- IPAdapterLoader
---

# IPAdapter Unified Loader
## Documentation
- Class name: `IPAdapterUnifiedLoader`
- Category: `ipadapter`
- Output node: `False`

The IPAdapterUnifiedLoader node serves as a foundational component for loading various IPAdapter configurations, facilitating the dynamic integration of different model presets and computational backends. It abstracts the complexity of handling diverse input parameters, offering a streamlined approach to adapt image processing algorithms to specific needs.
## Input types
### Required
- **`model`**
    - Specifies the model to be used, serving as a key parameter in determining the processing capabilities and the output quality of the node.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`preset`**
    - Defines the preset configuration to apply, allowing for customization of the processing based on predefined settings.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`ipadapter`**
    - Optional parameter for specifying an IPAdapter instance, enabling further customization and flexibility in processing.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The configured model ready for use, encapsulating the selected presets and adjustments.
    - Python dtype: `str`
- **`ipadapter`**
    - Comfy dtype: `IPADAPTER`
    - An optional IPAdapter instance that can be used for additional processing or customization.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterUnifiedLoader:
    def __init__(self):
        self.lora = None
        self.clipvision = { "file": None, "model": None }
        self.ipadapter = { "file": None, "model": None }
        self.insightface = { "provider": None, "model": None }

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model": ("MODEL", ),
            "preset": (['LIGHT - SD1.5 only (low strength)', 'STANDARD (medium strength)', 'VIT-G (medium strength)', 'PLUS (high strength)', 'PLUS FACE (portraits)', 'FULL FACE - SD1.5 only (portraits stronger)'], ),
        },
        "optional": {
            "ipadapter": ("IPADAPTER", ),
        }}

    RETURN_TYPES = ("MODEL", "IPADAPTER", )
    RETURN_NAMES = ("model", "ipadapter", )
    FUNCTION = "load_models"
    CATEGORY = "ipadapter"

    def load_models(self, model, preset, lora_strength=0.0, provider="CPU", ipadapter=None):
        pipeline = { "clipvision": { 'file': None, 'model': None }, "ipadapter": { 'file': None, 'model': None }, "insightface": { 'provider': None, 'model': None } }
        if ipadapter is not None:
            pipeline = ipadapter

        # 1. Load the clipvision model
        clipvision_file = get_clipvision_file(preset)
        if clipvision_file is None:
            raise Exception("ClipVision model not found.")

        if clipvision_file != self.clipvision['file']:
            if clipvision_file != pipeline['clipvision']['file']:
                self.clipvision['file'] = clipvision_file
                self.clipvision['model'] = load_clip_vision(clipvision_file)
                print(f"\033[33mINFO: Clip Vision model loaded from {clipvision_file}\033[0m")
            else:
                self.clipvision = pipeline['clipvision']

        # 2. Load the ipadapter model
        is_sdxl = isinstance(model.model, (comfy.model_base.SDXL, comfy.model_base.SDXLRefiner, comfy.model_base.SDXL_instructpix2pix))
        ipadapter_file, is_insightface, lora_pattern = get_ipadapter_file(preset, is_sdxl)
        if ipadapter_file is None:
            raise Exception("IPAdapter model not found.")

        if ipadapter_file != self.ipadapter['file']:
            if pipeline['ipadapter']['file'] != ipadapter_file:
                self.ipadapter['file'] = ipadapter_file
                self.ipadapter['model'] = ipadapter_model_loader(ipadapter_file)
                print(f"\033[33mINFO: IPAdapter model loaded from {ipadapter_file}\033[0m")
            else:
                self.ipadapter = pipeline['ipadapter']

        # 3. Load the lora model if needed
        if lora_pattern is not None:
            lora_file = get_lora_file(lora_pattern)
            lora_model = None
            if lora_file is None:
                raise Exception("LoRA model not found.")

            if self.lora is not None:
                if lora_file == self.lora['file']:
                    lora_model = self.lora['model']
                else:
                    self.lora = None
                    torch.cuda.empty_cache()

            if lora_model is None:
                lora_model = comfy.utils.load_torch_file(lora_file, safe_load=True)
                self.lora = { 'file': lora_file, 'model': lora_model }
                print(f"\033[33mINFO: LoRA model loaded from {lora_file}\033[0m")

            if lora_strength > 0:
                model, _ = load_lora_for_models(model, None, lora_model, lora_strength, 0)

        # 4. Load the insightface model if needed
        if is_insightface:
            if provider != self.insightface['provider']:
                if pipeline['insightface']['provider'] != provider:
                    self.insightface['provider'] = provider
                    self.insightface['model'] = insightface_loader(provider)
                    print(f"\033[33mINFO: InsightFace model loaded with {provider} provider\033[0m")
                else:
                    self.insightface = pipeline['insightface']

        return (model, { 'clipvision': self.clipvision, 'ipadapter': self.ipadapter, 'insightface': self.insightface }, )

```
