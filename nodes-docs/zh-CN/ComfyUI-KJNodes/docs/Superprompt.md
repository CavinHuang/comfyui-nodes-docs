
# Documentation
- Class name: Superprompt
- Category: KJNodes/text
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Superprompt节点利用在SuperPrompt数据集上微调的T5模型来增强文本提示，使其具有更详细的描述。这个过程旨在通过为文本到图像模型提供更加详尽的提示来提高其性能。

# Input types
## Required
- instruction_prompt
    - 这是一个用于引导提示扩展的指令，为如何详细阐述提示设定上下文。它在决定最终扩展提示的方向和风格方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt
    - 这是初始的文本提示，将被扩展成更详细的描述。它是Superprompt节点处理的核心内容，为生成更丰富、更具体的描述提供基础。
    - Comfy dtype: STRING
    - Python dtype: str
- max_new_tokens
    - 指定要生成的最大新token数，用于控制扩展后提示的长度。这个参数让用户能够根据需要调整输出的详细程度和复杂性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- string
    - 输出是原始文本提示的增强版，包含更多细节和描述。这个扩展后的提示旨在为文本到图像模型提供更丰富的上下文，从而可能产生更精确或更富创意的图像结果。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Superprompt:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "instruction_prompt": ("STRING", {"default": 'Expand the following prompt to add more detail', "multiline": True}),
                "prompt": ("STRING", {"default": '', "multiline": True, "forceInput": True}),
                "max_new_tokens": ("INT", {"default": 128, "min": 1, "max": 4096, "step": 1}),
            } 
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "process"
    CATEGORY = "KJNodes/text"
    DESCRIPTION = """
# SuperPrompt
A T5 model fine-tuned on the SuperPrompt dataset for  
upsampling text prompts to more detailed descriptions.  
Meant to be used as a pre-generation step for text-to-image  
models that benefit from more detailed prompts.  
https://huggingface.co/roborovski/superprompt-v1
"""

    def process(self, instruction_prompt, prompt, max_new_tokens):
        device = model_management.get_torch_device()
        from transformers import T5Tokenizer, T5ForConditionalGeneration

        checkpoint_path = os.path.join(script_directory, "models","superprompt-v1")
        tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-small", legacy=False)

        model = T5ForConditionalGeneration.from_pretrained(checkpoint_path, device_map=device)
        model.to(device)
        input_text = instruction_prompt + ": " + prompt
        print(input_text)
        input_ids = tokenizer(input_text, return_tensors="pt").input_ids.to(device)
        outputs = model.generate(input_ids,  max_new_tokens=max_new_tokens)
        out = (tokenizer.decode(outputs[0]))
        out = out.replace('<pad>', '')
        out = out.replace('</s>', '')
        print(out)
        
        return (out, )

```
