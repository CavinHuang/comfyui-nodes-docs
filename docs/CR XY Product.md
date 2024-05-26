# Documentation
- Class name: CR_XYProduct
- Category: Comfyroll/List/Utils
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_XYProduct 节点旨在对两个字符串列表执行交叉连接操作。它接受两个多行文本输入，并生成两个列表中元素的所有可能组合，创建一个笛卡尔积。这个节点在需要探索两个数据集之间所有可能配对的场景中特别有用。

# Input types
## Required
- text_x
    - 参数 'text_x' 是一个多行文本输入，表示要在交叉连接操作中使用的首个字符串列表。它在确定将与 'text_y' 中的元素结合的元素方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- text_y
    - 参数 'text_y' 是另一个多行文本输入，表示要在交叉连接操作中使用的第二个字符串列表。它与 'text_x' 一起工作，以产生笛卡尔积。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- x_values
    - 输出 'x_values' 是一个字符串列表，代表交叉连接操作后第一个输入列表中的元素。它包含每个唯一组合的第一个元素。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- y_values
    - 输出 'y_values' 是一个字符串列表，代表交叉连接操作后第二个输入列表中的元素。它包含每个唯一组合的第二个元素。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- show_help
    - 输出 'show_help' 提供了一个 URL 链接，用于获取有关节点操作的进一步帮助或信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_XYProduct:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text_x': ('STRING', {'multiline': True}), 'text_y': ('STRING', {'multiline': True})}}
    RETURN_TYPES = (any_type, any_type, 'STRING')
    RETURN_NAMES = ('x_values', 'y_values', 'show_help')
    OUTPUT_IS_LIST = (True, True, False)
    FUNCTION = 'cross_join'
    CATEGORY = icons.get('Comfyroll/List/Utils')

    def cross_join(self, text_x, text_y):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-xy-product'
        list1 = text_x.strip().split('\n')
        list2 = text_y.strip().split('\n')
        cartesian_product = list(product(list1, list2))
        (x_values, y_values) = zip(*cartesian_product)
        return (list(x_values), list(y_values), show_help)
```