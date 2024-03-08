import React, { useState } from 'react';
import { Button, Form, Input, Select, Upload, Switch } from 'antd';
import ImgCrop from 'antd-img-crop';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { generateSlug } from '@/utils';
import useNewCategory from '@/hooks/useNewCategory';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const CATEGORY_TYPE_CHOICES = [
  "Household Goods",
  "Farm Equipment",
  "Electronics",
  "Women's Clothing",
  "Men's Clothing",
  "Computer & Office",
  "Shoes",
  "Jewelry & Watches",
  "Babies & Kids",
  "Toys & Games",
  "Furniture",
  "Health & Beauty",
  "Gaming Hardware",
];

export function NewCategory() {
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState([]);
  const [slugValue, setSlugValue] = useState('');

  const { mutate, isLoading } = useNewCategory();

  const handleImageChange = async({ fileList }) => {
    setImageFileList(fileList);
  };

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('slug', slugValue);
    formData.append('is_featured', values.is_featured);
    formData.append('image', imageFileList[0].originFileObj,)

    mutate(formData)
  };

  const handleNameChange = (e) => {
    const slug = generateSlug(e);
    setSlugValue(slug);
    form.setFieldsValue({ slug });
  };

  const customReq = () => {
    console.log("Hello world!");
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="flex justify-between items-center mb-8 p-6">
          <Typography variant="h6" color="white">
            ADD PRODUCT CATEGORY
          </Typography>
        </CardHeader>
        <CardBody className="overflow-hidden px-0 pt-0 pb-2">
          <Form {...formItemLayout} form={form} onFinish={handleFormSubmit} enctype="multipart/form-data" className="flex gap-6 flex-col p-6" variant="filled" style={{ maxWidth: 700 }}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please select category title!' }]}
              help="Select the title of the category"
            >
              <Select className="border border-gray-300" onChange={handleNameChange}>
                {CATEGORY_TYPE_CHOICES.map((title) => (
                  <Select.Option key={title} value={title}>{title}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Is Featured"
              name="is_featured"
              valuePropName="checked"
              help="Check if the category is featured"
            >
              <Switch
                className="bg-gray-500"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              help="Upload an image for the category"
            >
              <ImgCrop>
                <Upload
                  listType="picture-card"
                  fileList={imageFileList}
                  onChange={handleImageChange}
                  maxCount={1}
                >
                  {imageFileList.length < 1 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button htmlType="submit" style={{ width: 400 }} className="bg-gray-700 text-white" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </CardBody>
      </Card>

    </div>
  );
}

export default NewCategory;
