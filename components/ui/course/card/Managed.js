const Item = ({ title, value }) => {
  return (
    <div className="bg-gray-50 px-4 py-5 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  );
};

export default function ManagedCourseCard({ children, course }) {
  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
      <div className="border-t border-gray-200">
        <dl>
          <Item title="Course ID" value={course.ownedCourseId} />
          <Item title="Proof" value={course.proof} />
          <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
        </dl>
      </div>
    </div>
  );
}
