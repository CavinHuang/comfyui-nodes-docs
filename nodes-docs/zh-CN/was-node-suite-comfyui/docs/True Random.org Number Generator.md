# Documentation
- Class name: WAS_True_Random_Number
- Category: WAS Suite/Number
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_True_Random_Number节点旨在生成具有高安全性和可靠性的随机数。它利用RANDOM.ORG API为用户提供真正的随机数，确保在随机性至关重要的应用中的不可预测性和公平性达到很高的程度。

# Input types
## Required
- api_key
    - API密钥对于访问RANDOM.ORG服务至关重要。它验证用户的请求并启用随机数的生成。没有有效的API密钥，节点无法执行其预定功能。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- minimum
    - 最小值参数定义了生成随机数的范围的下限。它确保输出数字满足指定的最小标准，这对于具有特定数字要求的应用程序至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- maximum
    - 最大值参数为生成的随机数范围设置了上限。这对于控制数字的规模并使其与应用程序的需求相一致非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mode
    - 模式参数决定随机数是按随机还是固定序列生成。这可以影响数字的可预测性和用例，对用户来说是一个重要的选择。
    - Comfy dtype: COMBO[random, fixed]
    - Python dtype: str

# Output types
- number
    - 输出数字是节点操作的核心结果。它代表了在指定范围内生成的真正随机数，是要求随机性的应用的基本元素。
    - Comfy dtype: COMBO[NUMBER, FLOAT, INT]
    - Python dtype: Union[int, float]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_True_Random_Number:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'api_key': ('STRING', {'default': '00000000-0000-0000-0000-000000000000', 'multiline': False}), 'minimum': ('FLOAT', {'default': 0, 'min': -18446744073709551615, 'max': 18446744073709551615}), 'maximum': ('FLOAT', {'default': 10000000, 'min': -18446744073709551615, 'max': 18446744073709551615}), 'mode': (['random', 'fixed'],)}}
    RETURN_TYPES = ('NUMBER', 'FLOAT', 'INT')
    FUNCTION = 'return_true_randm_number'
    CATEGORY = 'WAS Suite/Number'

    def return_true_randm_number(self, api_key=None, minimum=0, maximum=10):
        number = self.get_random_numbers(api_key=api_key, minimum=minimum, maximum=maximum)[0]
        return (number,)

    def get_random_numbers(self, api_key=None, amount=1, minimum=0, maximum=10, mode='random'):
        """Get random number(s) from random.org"""
        if api_key in [None, '00000000-0000-0000-0000-000000000000', '']:
            cstr('No API key provided! A valid RANDOM.ORG API key is required to use `True Random.org Number Generator`').error.print()
            return [0]
        url = 'https://api.random.org/json-rpc/2/invoke'
        headers = {'Content-Type': 'application/json'}
        payload = {'jsonrpc': '2.0', 'method': 'generateIntegers', 'params': {'apiKey': api_key, 'n': amount, 'min': minimum, 'max': maximum, 'replacement': True, 'base': 10}, 'id': 1}
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        if response.status_code == 200:
            data = response.json()
            if 'result' in data:
                return (data['result']['random']['data'], float(data['result']['random']['data']), int(data['result']['random']['data']))
        return [0]

    @classmethod
    def IS_CHANGED(cls, api_key, mode, **kwargs):
        m = hashlib.sha256()
        m.update(api_key)
        if mode == 'fixed':
            return m.digest().hex()
        return float('NaN')
```