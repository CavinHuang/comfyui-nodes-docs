# Moondream Interrogator
## Documentation
- Class name: `Moondream Interrogator`
- Category: `Hangover`
- Output node: `False`

The Moondream Interrogator node leverages the Moondream visual language model to generate textual descriptions based on input images and prompts. It dynamically adjusts to model revisions, supports device selection, and incorporates temperature settings for response variability.
## Input types
### Required
- **`image`**
    - The input image tensor to be analyzed and described by the Moondream model. It plays a crucial role in generating the textual output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`prompt`**
    - A textual prompt that guides the model in generating descriptions for the input image. It influences the context and specificity of the generated text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`separator`**
    - A string used to separate multiple descriptions in the output, allowing for clear delineation between different generated texts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`model_revision`**
    - Specifies the revision of the Moondream model to use, enabling the selection of different model versions for varied outputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`temperature`**
    - Controls the randomness of the generated descriptions, affecting the variability and creativity of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`device`**
    - Determines the computational device (CPU or GPU) on which the model runs, impacting performance and efficiency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`trust_remote_code`**
    - A security setting that must be enabled to use remote code execution within the Moondream model.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`description`**
    - Comfy dtype: `STRING`
    - The generated textual descriptions for the input image, influenced by the provided prompt and model settings.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Moondream:
    HUGGINGFACE_MODEL_NAME = "vikhyatk/moondream2"
    DEVICES = ["cpu", "gpu"] if torch.cuda.is_available() else  ["cpu"]
    Versions = 'versions.txt'
    Model_Revisions_URL = f"https://huggingface.co/{HUGGINGFACE_MODEL_NAME}/raw/main/{Versions}"
    current_path = os.path.abspath(os.path.dirname(__file__))
    try:
        print("[Moondream] trying to update model versions...", end='')
        response = requests.get(Model_Revisions_URL)
        if response.status_code == 200:
            with open(f"{current_path}/{Versions}", 'w') as f:
                f.write(response.text)
            print('ok')
    except Exception as e:
        if hasattr(e, 'message'):
            msg = e.message
        else:
            msg = e
        print(f'failed ({msg})')

    with open(f"{current_path}/{Versions}", 'r') as f:
        versions = f.read()
    MODEL_REVISIONS = [v for v in versions.splitlines() if v.strip()]

    print(f"[Moondream] found model versions: {', '.join(MODEL_REVISIONS)}")

    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.revision = None

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "prompt": ("STRING", {"multiline": True, "default": "Please provide a detailed description of this image."},),
                "separator": ("STRING", {"multiline": False, "default": r"\n"},),
                # "huggingface_model": (s.HUGGINGFACE_MODEL_NAMES, {"default": s.HUGGINGFACE_MODEL_NAMES[-1]},),
                "model_revision": (s.MODEL_REVISIONS, {"default": s.MODEL_REVISIONS[-1]},),
                "temperature": ("FLOAT", {"min": 0.0, "max": 1.0, "step": 0.01, "default": 0.},),
                "device": (s.DEVICES, {"default": s.DEVICES[0]},),
                "trust_remote_code": ("BOOLEAN", {"default": False},),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("description",)
    FUNCTION = "interrogate"
    OUTPUT_NODE = False
    CATEGORY = "Hangover"

    def interrogate(self, image:torch.Tensor, prompt:str, separator:str, model_revision:str, temperature:float, device:str, trust_remote_code:bool):
        if not trust_remote_code:
            raise ValueError("You have to trust remote code to use this node!")

        if prompt == 'list_model_references':
            try:
                print('\033[92m\033[4m[Moondream] model revsion references:\033[0m\033[92m')
                git_status = Run_git_status(Moondream.HUGGINGFACE_MODEL_NAME)
                for s in git_status:
                    print(s)
                return ("",)
            finally:
                print('\033[0m')

        dev = "cuda" if device.lower() == "gpu" else "cpu"
        if temperature < 0.01:
            temperature = None
            do_sample = None
        else:
            do_sample = True

        if (self.model == None) or (self.tokenizer == None) or (device != self.device) or (model_revision != self.revision):
            del self.model
            del self.tokenizer
            gc.collect()
            if (device == "cpu") and torch.cuda.is_available():
                torch.cuda.empty_cache()
            self.model = None
            self.tokenizer = None
            self.revision = model_revision

            print(f"[Moondream] loading model moondream2 revision '{model_revision}', please stand by....")
            if model_revision == Moondream.MODEL_REVISIONS[0]:
                model_revision = None

            try:
                self.model = AutoModel.from_pretrained(
                    Moondream.HUGGINGFACE_MODEL_NAME, 
                    trust_remote_code=trust_remote_code,
                    revision=model_revision
                ).to(dev)
                self.tokenizer = Tokenizer.from_pretrained(Moondream.HUGGINGFACE_MODEL_NAME)
            except RuntimeError:
                raise ValueError(f"[Moondream] Please check if the tramsformer package fulfills the requirements. "
                                  "Also note that older models might not work anymore with newer packages.")

            self.device = device

        descriptions = ""
        prompts = list(filter(lambda x: x!="", [s.lstrip() for s in prompt.splitlines()])) # make a prompt list and remove unnecessary whitechars and empty lines
        if len(prompts) == 0:
            prompts = [""]
        
        try:
            for im in image:
                i = 255. * im.cpu().numpy()
                img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
                enc_image = self.model.encode_image(img)
                descr = ""
                sep = codecs.decode(separator, 'unicode_escape')
                for p in prompts:
                    answer = self.model.answer_question(enc_image, p, self.tokenizer, temperature=temperature, do_sample=do_sample)
                    descr += f"{answer}{sep}"
                descriptions += f"{descr[0:-len(sep)]}\n"
        except RuntimeError:
            raise ValueError(f"[Moondream] Please check if the tramsformer package fulfills the requirements. "
                                  "Also note that older models might not work anymore with newer packages.")
        
        return(descriptions[0:-1],)

```
