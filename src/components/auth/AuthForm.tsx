import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";

export default function AuthForm({
  form,
  onSubmit,
  fields,
  buttonText,
}: {
  form: any;
  onSubmit: (data: any) => void;
  fields: Field[];
  buttonText: string;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormInput key={field.name} form={form} field={field} />
        ))}
        <Button type="submit" className="w-full">
          {buttonText}
        </Button>
        {form.formState.errors.root && (
          <FormMessage>
            {form.formState.errors.root.message}
          </FormMessage>
        )}
      </form>
    </Form>
  );
}

function FormInput({ form, field }: { form: any; field: Field }) {
  return (
    <FormField
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <Input placeholder={field.placeholder} {...formField} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export type Field = {
  name: string;
  label: string;
  placeholder: string;
};
