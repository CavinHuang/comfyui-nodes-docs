
# Documentation
- Class name: ArgosTranslateCLIPTextEncodeNode
- Category: AlekPet Nodes/conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ArgosTranslateCLIPTextEncodeNode是一个多功能节点，结合了Argos Translate库的翻译功能和CLIP的文本编码能力。它能够将文本从一种语言翻译成另一种语言，然后将翻译后的文本编码成适合条件模型使用的格式。这个节点为多语言文本处理和分析提供了强大的支持。

# Input types
## Required
- from_translate
    - 指定翻译的源语言代码。它决定了文本将从哪种语言进行翻译，影响翻译的准确性和目标语言的选择范围。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- to_translate
    - 定义翻译的目标语言代码。它决定了翻译后文本的最终语言，使用户能够将文本转换为各种支持的语言。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- text
    - 需要翻译的输入文本。这段文本会经过翻译然后进行编码，是后续操作的主要内容。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - 用于对翻译后的文本进行编码的CLIP模型实例。它在将文本转换为可用于条件设置的格式中起着关键作用，提高了节点在文本分析中的实用性。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module

# Output types
- conditioning
    - 翻译后文本的编码表示，适用于条件模型。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- string
    - 翻译后的文本，直接输出翻译过程的结果。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
